/// <reference types="npm:@types/node" />

// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js";
import { ignoreLogger, VNPay } from "npm:vnpay";

Deno.serve(async (req) => {
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_ANON_KEY") ?? "",
    {
      global: {
        headers: { Authorization: req.headers.get("Authorization")! },
      },
    },
  );

  const clientIp =
    req.headers.get("x-forwarded-for") ||
    req.headers.get("cf-connecting-ip") ||
    "0.0.0.0";

  // Get the host from the request headers
  const host = req.headers.get("host") || "localhost:54321";

  // Determine if it's a local environment
  const isLocal = host.includes("localhost") || host.includes("127.0.0.1");

  // Construct the base URL
  const baseUrl = isLocal ? `http://${host}` : `https://${host}`;

  const vnpay = new VNPay({
    tmnCode: `${Deno.env.get("VNPAY_TMN_CODE")}`,
    secureSecret: `${Deno.env.get("VNPAY_SECURE_SECRET")}`,
    vnpayHost: "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html",
    testMode: true, // tùy chọn, ghi đè vnpayHost thành sandbox nếu là true
    hashAlgorithm: "SHA512", // tùy chọn
    enableLog: true, // optional
    loggerFn: ignoreLogger, // optional
  });

  const paymentUrl = vnpay.buildPaymentUrl({
    vnp_Amount: 10000,
    vnp_IpAddr: clientIp,
    vnp_TxnRef: "12345",
    vnp_OrderInfo: "Thanh toan don hang 1234",
    vnp_OrderType: 100000,
    vnp_ReturnUrl: `exp://127.0.0.1:8081/--/(root)/confirm-ride`,
    vnp_Locale: "vn", // 'vn' hoặc 'en'
  });

  const data = {
    message: `Hello world from Deno!`,
    url: paymentUrl,
  };

  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
  });
});
