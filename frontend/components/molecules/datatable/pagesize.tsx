"use client";

import { Select, Text } from "@mantine/core";

interface Props {
  value: number;
  onChange: (value: number) => void;
  total?: number;
}

const options = ["10", "20", "50", "100"];

export default function PageSize({ value, onChange, total }: Props) {
  return (
    <div className="flex gap-2 items-center">
      <Text size="sm">Show</Text>
      <Select
        checkIconPosition="right"
        data={options}
        value={value.toString()}
        onChange={(val) => {
          if (val) {
            onChange(Number(val))
          }
        }}
        allowDeselect={false}
        w={70}
        size="xs"
      />
      {!!total && (
        <>
          <Text size="sm">of</Text>
          <Text size="sm">{total} data</Text>
        </>
      )}
    </div>
  );
}
