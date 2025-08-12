import { BetterUser } from "@/lib/auth/server";
import { google } from "@ai-sdk/google";
import {
  InferUITools,
  ToolSet,
  UIDataTypes,
  UIMessage,
  convertToModelMessages,
  stepCountIs,
  streamText,
} from "ai";
import { format } from "date-fns";
import { saveChat } from "./functions";
import { SYSTEM_PROMPT } from "./prompt";

const tools: ToolSet = {};

export type ChatTools = InferUITools<typeof tools>;
export type ChatMessage = UIMessage<never, UIDataTypes, ChatTools>;
export const agent = (messages: ChatMessage[], chatId: string, user: BetterUser) => {
  const coreMessages = convertToModelMessages(messages);
  const systemPrompt = `${SYSTEM_PROMPT} Current date is: ${
    new Date().toISOString().split("T")[0]
  } and today is ${format(new Date(), "EEEE")}.`;

  const result = streamText({
    model: google("gemini-2.0-flash"),
    messages: coreMessages,
    tools,
    system: systemPrompt,
    stopWhen: stepCountIs(10),
    onError: async (error) => {
      console.error("Error in agent:", error);
    },
  });
  return result.toUIMessageStreamResponse({
    originalMessages: messages,
    onFinish: async ({ messages }) => {
      await saveChat(chatId, user.id, messages);
    },
  });
};
