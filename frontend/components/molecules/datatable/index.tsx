"use client";

import {
  Table,
  TableThead,
  TableTr,
  TableTh,
  TableTbody,
  ScrollArea,
  Box,
  Group,
  Text,
  Skeleton,
  TableTd,
} from "@mantine/core";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { useDebouncedValue } from "@mantine/hooks";
import Search from "./search";
import Pagination from "./pagination";
import Pagesize from "./pagesize";

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
  renderRow: (row: T, index?: number) => React.ReactNode;
  headerRightSection?: React.ReactNode;
}

export default function DataTable<T>({
  columns,
  data,
  meta,
  renderRow,
  headerRightSection,
}: DataTableProps<T>) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState(searchParams.get("q") ?? "");
  const [debouncedSearch] = useDebouncedValue(searchValue, 500);
  const [isPending, startTransition] = useTransition();

  const page = Number(searchParams.get("page") ?? "1");
  const pageSize = Number(searchParams.get("size") ?? "10");
  const search = searchParams.get("q") ?? "";

  const setQueryParam = (
    key: string,
    value: string,
    options: { resetPage?: boolean } = {}
  ) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    if (options.resetPage) {
      params.set("page", "1");
    }

    startTransition(() => {
      router.push(`?${params.toString()}`);
    });
  };

  const handlePageChange = (newPage: number) => {
    setQueryParam("page", newPage.toString());
  };

  const handleSizeChange = (newSize: number) => {
    setQueryParam("size", newSize.toString(), { resetPage: true });
  };

  useEffect(() => {
    if (debouncedSearch !== search) {
      const params = new URLSearchParams(searchParams.toString());
      if (debouncedSearch) {
        params.set("q", debouncedSearch);
      } else {
        params.delete("q");
      }
      params.set("page", "1");

      startTransition(() => {
        router.push(`?${params.toString()}`);
      });
    }
  }, [debouncedSearch]);

  const renderSkeleton = () => {
    return (
      <Table striped withTableBorder>
        <TableThead>
          <TableTr>
            {columns.map((_, i) => (
              <TableTh
                key={i}
                py="sm"
                {...(i === 0 && {
                  width: 100,
                })}
              >
                <Skeleton height={12} radius="2xl" />
              </TableTh>
            ))}
          </TableTr>
        </TableThead>
        <TableTbody>
          {Array.from({ length: 10 }).map((_, i) => (
            <TableTr key={i}>
              {columns.map((_, x) => (
                <TableTd key={`${x}_${i}`} py="sm">
                  <Skeleton height={12} radius="2xl" />
                </TableTd>
              ))}
            </TableTr>
          ))}
        </TableTbody>
      </Table>
    );
  };

  return (
    <Box>
      <Group justify="space-between" mb="lg">
        <Search value={searchValue} onChange={setSearchValue}/>
        {headerRightSection}
      </Group>

      {isPending ? (
        renderSkeleton()
      ) : (
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
              {data.length ? (
                data.map((row, i) => (
                  <TableTr key={i}>{renderRow(row, i)}</TableTr>
                ))
              ) : (
                <TableTr>
                  <TableTd colSpan={columns.length}>
                    <Text size="sm" className="text-center">
                      Data not found
                    </Text>
                  </TableTd>
                </TableTr>
              )}
            </TableTbody>
          </Table>
        </ScrollArea>
      )}

      <Group justify="space-between" mt="md">
        <Pagesize
          value={pageSize}
          onChange={handleSizeChange}
          total={meta.total_data}
        />
        <Pagination
          page={page}
          onChange={handlePageChange}
          total={meta.total_page}
        />
      </Group>
    </Box>
  );
}
