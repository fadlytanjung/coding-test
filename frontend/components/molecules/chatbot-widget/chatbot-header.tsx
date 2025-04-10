import { Group, ActionIcon } from "@mantine/core";
import { IconX, IconMaximize, IconMinimize } from "@tabler/icons-react";

export default function ChatBotHeader({
  fullscreen,
  onToggleFullscreen,
  onClose,
}: {
  fullscreen: boolean;
  onToggleFullscreen: () => void;
  onClose: () => void;
}) {
  return (
    <Group justify="space-between" px="sm" py="xs">
      <strong>Chatbot (Gemini AI Model)</strong>
      <Group gap={4}>
        <ActionIcon variant="subtle" onClick={onToggleFullscreen}>
          {fullscreen ? <IconMinimize size={16} /> : <IconMaximize size={16} />}
        </ActionIcon>
        <ActionIcon variant="subtle" color="red" onClick={onClose}>
          <IconX size={16} />
        </ActionIcon>
      </Group>
    </Group>
  );
}
