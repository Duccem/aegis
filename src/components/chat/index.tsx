"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSession } from "@/contexts/auth/user/ui/components/auth/session-provider";
import { useEnterSubmit } from "@/hooks/use-enter-submit";
import { useScrollAnchor } from "@/hooks/use-scroll-anchor";
import { getChat } from "@/lib/core/chat/infrastructure/http-chat-api";
import { useChat } from "@ai-sdk/react";
import { useQuery } from "@tanstack/react-query";
import { DefaultChatTransport } from "ai";
import { Send, Sparkles, X } from "lucide-react";
import { motion, useAnimate } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";
import { v4 } from "uuid";
import { ChatEmpty } from "./main/chat-empty";
import { ChatExamples } from "./main/chat-examples";
import { ChatList } from "./main/chat-list";
import { Header } from "./main/header";
import SidebarList from "./sidebar/sidebar-list";
export const Chat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scope, animate] = useAnimate();
  const [chatRef, animateChat] = useAnimate();
  const [isExpanded, setExpanded] = useState(false);
  const [chatId, setChatId] = useState<string>();
  const [input, setInput] = useState("");
  const { user } = useSession();
  const [initialMessages, setInitialMessages] = useState<any[]>([]);
  const { data: chat } = useQuery({
    queryKey: ["chat", chatId],
    queryFn: async () => getChat(chatId),
    enabled: !!chatId,
  });
  const [isHovered, setIsHovered] = useState(false);
  const { messagesRef, scrollRef, visibilityRef, scrollToBottom } = useScrollAnchor();
  const toggleOpen = () => setExpanded((prev) => !prev);
  useOnClickOutside(scope, () => {
    if (isOpen) {
      handleClose();
    }
  });
  const { formRef, onKeyDown } = useEnterSubmit();

  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleClose = async () => {
    await animateChat(chatRef.current, {
      scaleY: 0,
    });
    await animate(scope.current, {
      width: 0,
      opacity: 0,
      y: 0,
    });
    setIsOpen(false);
  };

  const { messages, sendMessage, setMessages } = useChat({
    messages: initialMessages,
    transport: new DefaultChatTransport({
      api: "/api/chat",
      body: {
        user,
        chatId: chatId ?? v4(),
      },
    }),
  });

  const showExamples = messages.length === 0;
  useEffect(() => {
    requestAnimationFrame(() => {
      inputRef?.current?.focus();
    });
  }, [messages]);

  const onNewChat = () => {
    const newChatId = v4();
    setExpanded(false);
    setMessages([]);
    setChatId(newChatId);
  };

  const handleOnSelect = (id: string) => {
    setExpanded(false);
    setChatId(id);
  };

  useEffect(() => {
    if (chat) {
      const retrivedMessages = chat.messages;
      setMessages(retrivedMessages);
      setInitialMessages(retrivedMessages);
    }
  }, [chat]);

  if (isOpen) {
    return (
      <motion.div
        initial={{ width: 0, opacity: 0, y: 0 }}
        animate={{ width: "44%", opacity: 1, y: 1 }}
        ref={scope}
        className="fixed origin-center bottom-4 left-1/2 -translate-x-1/2  z-50 flex items-center justify-center  p-3 bg-background rounded-xl border  "
      >
        <Button onClick={handleClose} variant={"ghost"} size={"icon"}>
          <X />
        </Button>
        <form
          action=""
          className="flex-1"
          ref={formRef}
          onSubmit={(e) => {
            e.preventDefault();
            const newId = v4();
            if (!chatId) {
              setChatId(newId);
            }
            sendMessage({ text: input });
            setInput("");
            scrollToBottom();
          }}
        >
          <Input
            className="focus-visible:ring-0 focus-visible:ring-transparent border-none"
            placeholder="En que te puedo ayudar?"
            autoFocus
            value={input}
            onChange={(evt) => {
              setInput(evt.target.value);
            }}
            onKeyDown={onKeyDown}
          />
        </form>
        <Button
          onClick={(e) => {
            const newId = v4();
            if (!chatId) {
              setChatId(newId);
            }
            sendMessage({ text: input });
            setInput("");
            scrollToBottom();
          }}
          variant={"ghost"}
          size={"icon"}
        >
          <Send />
        </Button>
        <motion.div
          initial={{ scaleY: 0 }}
          transition={{ delay: 0.5 }}
          animate={{ scaleY: 1 }}
          ref={chatRef}
          className="w-full origin-bottom h-[600px] absolute bottom-[70px] flex flex-col  border rounded-md bg-background overflow-hidden"
        >
          <SidebarList
            onNewChat={onNewChat}
            isExpanded={isExpanded}
            setExpanded={setExpanded}
            onSelect={handleOnSelect}
            chatId={chatId}
          />
          <Header toggleSidebar={toggleOpen} isExpanded={isExpanded} />
          <div className="relative h-full flex flex-col pb-4">
            <ScrollArea className="md:h-[500px]" ref={scrollRef}>
              <div ref={messagesRef}>
                {messages.length ? (
                  <ChatList messages={messages} className="p-4 pb-8" />
                ) : (
                  <ChatEmpty firstName={user?.name.split(" ").at(0) ?? ""} />
                )}
                <div className="w-full h-px" ref={visibilityRef} />
              </div>
            </ScrollArea>
            {showExamples && (
              <ChatExamples onSubmit={() => sendMessage({ text: input })} setInput={setInput} />
            )}
          </div>
        </motion.div>
      </motion.div>
    );
  }
  return (
    <motion.button
      className="flex items-center justify-center border bg-foreground border-foreground text-background  gap-2  rounded-[9999px] overflow-hidden fixed origin-center bottom-4 left-1/2 -translate-x-1/2 z-50 py-2 px-6 cursor-pointer  "
      initial={{ width: "120px", height: "28px" }}
      animate={{
        scale: isHovered ? 1.1 : 1,
      }}
      transition={{
        duration: 0.2,
        type: "spring",
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={() => {
        setIsOpen(true);
        setIsHovered(false);
      }}
    >
      Aegis <Sparkles className="text-background size-4" />
    </motion.button>
  );
};
