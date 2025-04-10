'use client';

import { TextInput } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';

interface Props {
  value: string;
  onChange: (val: string) => void;
}

export default function Search({ value, onChange }: Props) {
  return (
    <TextInput
      value={value}
      onChange={(e) => onChange(e.currentTarget.value)}
      placeholder="Search..."
      leftSection={<IconSearch size={14} />}
      w={220}
    />
  );
}
