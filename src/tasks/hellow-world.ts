import { schemaTask } from "@trigger.dev/sdk/v3";
import z from "zod";

export const helloWorld = schemaTask({
  id: "hello-world",
  schema: z.object({ name: z.string() }),
  queue: {
    concurrencyLimit: 10,
    name: "appointments",
  },
  run: async (payload) => {
    console.log(`Hello, World! ${payload.name}`);
  },
});
