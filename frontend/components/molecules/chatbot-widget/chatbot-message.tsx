import { ScrollArea, Stack, Box } from "@mantine/core";
import { Fragment, useRef, useEffect } from "react";
import MarkdownRenderer from "@/components/molecules/markdown-renderer";

export default function ChatBotMessages({
  messages,
  fullscreen,
}: {
  messages: { question: string; answer: string }[];
  fullscreen: boolean;
}) {
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <ScrollArea style={{ flex: 1 }} p="xs">
      <Stack gap="xs">
        <Box bg="gray.1" p="xs" style={{ borderRadius: 16, fontSize: 14 }}>
          Hello! How can I assist you today?
        </Box>
        {messages.map((el, id) => (
          <Fragment key={`${el.question}_${id}`}>
            <Box bg="blue.1" p="xs" ml="auto" style={{ borderRadius: 16, fontSize: 14 }}>
              {el.question}
            </Box>
            {el.answer && (
              <Box
                bg="gray.1"
                p="xs"
                style={{
                  borderRadius: 16,
                  width: fullscreen ? "100%" : 320,
                  fontSize: 12,
                }}
              >
                <MarkdownRenderer content={el.answer} />
              </Box>
            )}
          </Fragment>
        ))}
        <div ref={bottomRef} />
      </Stack>
    </ScrollArea>
  );
}
