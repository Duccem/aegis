import { EventSchemas, Inngest } from "inngest";

type MovementStockData = {
  data: {
    itemId: string;
    organizationId: string;
    storeId: string;
    quantity: number;
  };
};

type Events = {
  "store/movement.increase": MovementStockData;
  "store/movement.decrease": MovementStockData;
};

// Create a client to send and receive events
export const inngest = new Inngest({
  id: "my-app",
  schemas: new EventSchemas().fromRecord<Events>(),
});
