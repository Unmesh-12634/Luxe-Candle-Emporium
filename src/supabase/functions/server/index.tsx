import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-07a9f9cd/health", (c) => {
  return c.json({ status: "ok" });
});

// Create new order
app.post("/make-server-07a9f9cd/orders", async (c) => {
  try {
    const body = await c.req.json();
    
    // Generate a unique order ID
    const orderId = `order_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    const orderData = {
      id: orderId,
      createdAt: new Date().toISOString(),
      items: body.items || [],
      total: body.total || 0,
      customer: body.customer || {},
      paymentMethod: body.paymentMethod,
      status: "confirmed"
    };

    // Store in KV store
    await kv.set(`order:${orderId}`, orderData);

    return c.json({ success: true, orderId: orderId, data: orderData }, 201);
  } catch (error: any) {
    console.error("Error creating order:", error);
    return c.json({ error: error.message || "Failed to create order" }, 500);
  }
});

// Fetch all orders (optional, for admin or user if we add auth)
app.get("/make-server-07a9f9cd/orders", async (c) => {
  try {
    const orders = await kv.getByPrefix("order:");
    return c.json({ success: true, orders }, 200);
  } catch (error: any) {
    console.error("Error fetching orders:", error);
    return c.json({ error: error.message || "Failed to fetch orders" }, 500);
  }
});

Deno.serve(app.fetch);