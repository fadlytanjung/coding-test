import { Paper, rem } from "@mantine/core";
import { useState } from "react";
import ChatBotMessages from "./chatbot-message";
import ChatBotInput from "./chatbot-input";
import ChatBotHeader from "./chatbot-header";
import env from "@/libs/env";

export default function ChatBotContainer({ onClose }: { onClose: () => void }) {
  const [fullscreen, setFullscreen] = useState(false);
  const [messages, setMessages] = useState<
    { question: string; answer: string }[]
  >([]);
  const [loading, setLoading] = useState(false);

  const handleAskQuestion = async (question: string) => {
    setLoading(true);
    setMessages((prev) => [...prev, { question, answer: "" }]);

    try {
      const response = await fetch(`${env.NEXT_PUBLIC_BASE_API_URL}/ai`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let answerBuffer = "";

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          answerBuffer += decoder.decode(value);
          setMessages((prev) => {
            const updated = [...prev];
            updated[updated.length - 1] = {
              ...updated[updated.length - 1],
              answer: answerBuffer,
            };
            return updated;
          });
        }
      }
    } catch (err) {
      console.error("Streaming error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper
      shadow="xl"
      radius="md"
      withBorder
      p="xs"
      style={{
        position: "fixed",
        bottom: fullscreen ? 0 : rem(24),
        right: fullscreen ? 0 : rem(24),
        width: fullscreen ? "100vw" : rem(380),
        height: fullscreen ? "100vh" : rem(500),
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        backgroundColor: "white",
      }}
    >
      <ChatBotHeader
        fullscreen={fullscreen}
        onToggleFullscreen={() => setFullscreen((v) => !v)}
        onClose={onClose}
      />
      <ChatBotMessages messages={messages} fullscreen={fullscreen} />
      <ChatBotInput loading={loading} onSubmit={handleAskQuestion} />
    </Paper>
  );
}
