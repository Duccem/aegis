import { inngest } from "@/contexts/shared/infrastructure/inngest";
import { serve } from "inngest/next";

// Create an API that serves zero functions
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [],
});
