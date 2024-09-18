/// <reference types="npm:@types/node" />

// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";
import { ignoreLogger, VNPay } from "npm:vnpay";

console.log("Hello from Functions!");

Deno.serve(async (req) => {
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_ANON_KEY") ?? "",
    {
      global: {
        headers: { Authorization: req.headers.get("   Authorization")! },
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

    /**
     * Sử dụng enableLog để bật/tắt logger
     * Nếu enableLog là false, loggerFn sẽ không được sử dụng trong bất kỳ phương thức nào
     */
    enableLog: true, // optional

    /**
     * Hàm `loggerFn` sẽ được gọi để ghi log
     * Mặc định, loggerFn sẽ ghi log ra console
     * Bạn có thể ghi đè loggerFn để ghi log ra nơi khác
     *
     * `ignoreLogger` là một hàm không làm gì cả
     */
    loggerFn: ignoreLogger, // optional
  });

  const paymentUrl = vnpay.buildPaymentUrl({
    vnp_Amount: 10000,
    vnp_IpAddr: clientIp,
    vnp_TxnRef: "12345",
    vnp_OrderInfo: "Thanh toan don hang 1234",
    vnp_OrderType: 100000,
    vnp_ReturnUrl: `${Deno.env.get("VNPAY_RETURN_URL")}`,
    vnp_Locale: "vn", // 'vn' hoặc 'en'
  });

  const params = Object.fromEntries(
    new URLSearchParams(paymentUrl.split("?")[1]),
  );

  supabase
    .from("transactions")
    .insert([
      {
        transaction_code: params,
      },
    ])
    .select();

  const data = {
    message: `Hello world from Deno!`,
    url: paymentUrl,
  };

  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
  });
});

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/handle-transaction' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
