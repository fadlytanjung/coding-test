import { Box, Textarea, rem } from "@mantine/core";
import { useState } from "react";

export default function ChatBotInput({
  loading,
  onSubmit,
}: {
  loading: boolean;
  onSubmit: (q: string) => void;
}) {
  const [value, setValue] = useState("");

  const handleSubmit = () => {
    if (!value.trim()) return;
    onSubmit(value);
    setValue("");
  };

  return (
    <Box pt="xs">
      <Textarea
        placeholder={loading ? "Generating response..." : "Type your message..."}
        minRows={1}
        maxRows={6}
        value={value}
        disabled={loading}
        onChange={(e) => setValue(e.currentTarget.value)}
        onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSubmit()}
        styles={{
          input: {
            maxHeight: rem(180),
            overflowY: "auto",
          },
        }}
      />
    </Box>
  );
}
