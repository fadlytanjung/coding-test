'use client';

import {
  Table,
  TableThead,
  TableTr,
  TableTh,
  TableTbody,
  TableTd,
  ScrollArea,
  Box,
  Group,
} from '@mantine/core';
import { useState, useMemo } from 'react';
import Pagination from './pagination';
import Pagesize from './pagesize';
import Search from './search';


interface Meta {
  total_data: number;
  total_page: number;
  total_data_on_page: number;
  page: number;
  size: number;
}

interface DataTableProps<T> {
  columns: string[];
  data: T[];
  meta: Meta;
  renderRow: (row: T) => React.ReactNode;
}

export default function DataTable<T>({ columns, data, renderRow, meta }: DataTableProps<T>) {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(meta.page);
  const [pageSize, setPageSize] = useState(meta.size);

  const rows = data;
  const totalPages = meta.total_page;

  return (
    <Box>
    <Group justify="space-between" mb="sm">
      <Search value={search} onChange={setSearch} />
    </Group>

    <ScrollArea>
      <Table striped highlightOnHover withTableBorder>
        <TableThead>
          <TableTr>
            {columns.map((col, i) => (
              <TableTh key={i}>{col}</TableTh>
            ))}
          </TableTr>
        </TableThead>
        <TableTbody>
          {rows.map((row, i) => (
            <TableTr key={i}>{renderRow(row)}</TableTr>
          ))}
        </TableTbody>
      </Table>
    </ScrollArea>
    <Group justify="space-between" mt="md">
      <Pagesize value={pageSize} onChange={setPageSize} />
      <Pagination page={page} onChange={setPage} total={totalPages} />
    </Group>
  </Box>
  );
}
