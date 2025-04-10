"use client";

import { Pagination as PaginationBase, Box } from "@mantine/core";

interface Props {
  page: number;
  total: number;
  onChange: (page: number) => void;
}

export default function Pagination({ page, total, onChange }: Props) {
  return (
    <Box mt="md">
      <PaginationBase
        value={page}
        onChange={onChange}
        total={total}
        size="sm"
      />
    </Box>
  );
}
