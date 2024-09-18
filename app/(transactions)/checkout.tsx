import { getKeyByValue } from "@/constants/enum";
import axios from "axios";
import React, { Suspense, useEffect, useState } from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import WebView from "react-native-webview";

export default function Checkout() {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [transactionResult, setTransactionResult] = useState(null);
  const [result, setResult] = useState({} as any);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "https://ztqgqlskroyusdafhcca.supabase.co/functions/v1/handle-transaction",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${process.env.EXPO_PUBLIC_SUPABASE_TOKEN}`,
            },
          },
        );
        console.log(response.data.url);
        setUrl(response.data.url);
      } catch (error: any) {
        console.log("Error:", error.message);
      }
    };

    fetchData();
  }, []);

  const handleNavigationStateChange = async (navState: any) => {
    if (
      navState.url.startsWith(
        "https://ztqgqlskroyusdafhcca.supabase.co/functions/v1/handle-transaction-return",
      )
    ) {
      try {
        console.log("NAVSTATE: ", navState.url);
        const response = await axios.get(navState.url, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.EXPO_PUBLIC_SUPABASE_TOKEN}`,
          },
        });
        setTransactionResult(response.data);
        // Handle the transaction result here
        console.log("Transaction result:", response.data.params);

        const { vnp_TmnCode: transactionCode, vnp_ResponseCode: responseCode } =
          response.data.params;

        console.log(transactionCode);

        const result = getKeyByValue(`${responseCode}`);

        console.log(result);

        setResult({
          transactionCode,
          result,
        });
      } catch (error: any) {
        console.log("Error fetching transaction result:", error.message);
        setError("Failed to fetch transaction result");
      }
    } else {
      console.log("Not a transaction result URL");
    }
  };

  return (
    <Suspense fallback={<Text>Loading...</Text>}>
      <SafeAreaView style={{ flex: 1 }}>
        {transactionResult ? (
          <Text style={{ fontSize: 18, textAlign: "center", marginTop: 20 }}>
            {`The transaction ${result.transactionCode} is ${result.result}`}
          </Text>
        ) : (
          <WebView
            source={{ uri: url }}
            onNavigationStateChange={handleNavigationStateChange}
          />
        )}
      </SafeAreaView>
    </Suspense>
  );
}
