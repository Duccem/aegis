import { HttpNextResponse } from "@/lib/http/http-response";
import { routeHandler } from "@/lib/http/route-handler";
import { client } from "@/lib/payments";
import z from "zod";

export const POST = routeHandler(
  { name: "get-order-invoice", paramsSchema: z.object({ id: z.string() }) },
  async ({ params: { id } }) => {
    const order = await client.orders.get({ id });

    if (!order.isInvoiceGenerated) {
      await client.orders.generateInvoice({ id });
      return HttpNextResponse.json({
        status: "generating",
      });
    }

    try {
      const invoice = await client.orders.invoice({
        id,
      });

      return HttpNextResponse.json({
        status: "ready",
        url: invoice.url,
      });
    } catch (error) {
      return HttpNextResponse.json({
        status: "generating",
      });
    }
  },
  (error) => {
    console.error(error);
    return HttpNextResponse.internalServerError();
  },
);

export const GET = routeHandler(
  { name: "get-order-invoice-status", paramsSchema: z.object({ id: z.string() }) },
  async ({ params: { id } }) => {
    const order = await client.orders.get({ id });

    if (!order.isInvoiceGenerated) {
      return HttpNextResponse.json({
        status: "not_generated",
      });
    }

    try {
      const invoice = await client.orders.invoice({
        id,
      });

      return HttpNextResponse.json({
        status: "ready",
        url: invoice.url,
      });
    } catch (error) {
      return HttpNextResponse.json({
        status: "generating",
      });
    }
  },
  (error) => {
    console.error(error);
    return HttpNextResponse.internalServerError();
  },
);
