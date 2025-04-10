"use client";

import { Select, Text } from "@mantine/core";

interface Props {
  value: number;
  onChange: (value: number) => void;
}

const options = ["10", "20", "50", "100"];

export default function PageSize({ value, onChange }: Props) {
  return (
    <div className="flex gap-2 items-center">
      <Text size="sm">Row per page</Text>
      <Select
        checkIconPosition="right"
        data={options}
        value={value.toString()}
        onChange={(val) => onChange(Number(val))}
        w={60}
        size="xs"
      />
    </div>
  );
}
