"use client";

import DataTable from "@/components/molecules/datatable";
import { TableTd } from "@mantine/core";

const mockData = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  email: `user${i + 1}@mail.com`,
  role: i % 2 === 0 ? "Admin" : "User",
}));

export default function Page() {
  return (
    <DataTable
      columns={["#", "Name", "Email", "Role"]}
      data={mockData}
      meta={{
        total_data: 2,
        total_page: 2,
        total_data_on_page: 2,
        page: 1,
        size: 10,
      }}
      renderRow={(row) => (
        <>
          <TableTd>{row.id}</TableTd>
          <TableTd>{row.name}</TableTd>
          <TableTd>{row.email}</TableTd>
          <TableTd>{row.role}</TableTd>
        </>
      )}
    />
  );
}
