"use client";
import { useState } from "react";
import { UnstyledButton, Box, rem } from "@mantine/core";
import ChatBotContainer from "./chatbot-container";
import Image from "next/image";

export function ChatBotWidget() {
  const [opened, setOpened] = useState(false);

  return (
    <>
      {!opened && (
        <Box
          style={{
            position: "fixed",
            bottom: rem(24),
            right: rem(24),
            zIndex: 9999,
          }}
        >
          <UnstyledButton onClick={() => setOpened(true)}>
            <Image alt="chatbot" src="/chatbot.png" width={60} height={60} />
          </UnstyledButton>
        </Box>
      )}

      {opened && <ChatBotContainer onClose={() => setOpened(false)} />}
    </>
  );
}
