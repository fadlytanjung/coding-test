"use client";

import { useBreadcrumbs } from "@/hooks/use-breadcrumbs";
import { SalesRep } from "@/types/sales";
import {
  TableTd,
  Flex,
  Text,
  Badge,
  ActionIcon,
  Modal,
  ScrollArea,
} from "@mantine/core";
import { MetaType } from "../users";
import { IconEye } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState, useTransition } from "react";
import Breadcrumb from "@/components/atoms/breadcrums";
import DataTable from "@/components/molecules/datatable";
import Summary from "./summary";
import Chart from "./chart";

export default function Home({
  data,
  meta,
  ...props
}: {
  data: SalesRep[];
  meta: MetaType;
  totalDealsValue: number;
  dealsByClient: Record<string, number>;
  dealsByRegion: Record<string, number>;
  dealsByStatus: Record<string, number>;
  totalDealsPerRep: { name: string; totalValue: number }[];
}) {
  const items = useBreadcrumbs();
  const [opened, { open, close }] = useDisclosure(false);
  const [modalData, setModalData] = useState<Record<string, string[]>>({});
  const [key, setKey] = useState("");
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(async () => {
      await new Promise((resolve) =>
        setTimeout(
          () =>
            resolve(() => {
              // @NOTE: simutlate pending
            }),
          500
        )
      );
    });
  }, []);

  const handleOpenModal = (key: string, data: string[]) => {
    setKey(key);
    setModalData((prev) => ({
      ...prev,
      [key]: data,
    }));
    open();
  };

  const handleCloseModal = () => {
    setModalData({});
    close();
  };

  const mapDetailModalData = modalData[key] || [];

  return (
    <Flex direction="column" gap={28}>
      <div>
        <Text fw={700} size="lg" mb={4}>
          List Sales
        </Text>
        <Breadcrumb items={items} />
      </div>
      <Summary {...props} isPending={isPending} />
      <ScrollArea w="100%" offsetScrollbars>
        <DataTable
          columns={[
            "No",
            "Name",
            "Region",
            "Role",
            "Skills",
            "Clients",
            "Deals",
            "Total Deals",
          ]}
          data={data}
          meta={meta}
          renderRow={(row, i) => (
            <>
              <TableTd>
                {meta.size * (meta.page - 1) + (i as number) + 1}
              </TableTd>
              <TableTd>{row.name}</TableTd>
              <TableTd>{row.region}</TableTd>
              <TableTd>{row.role}</TableTd>

              <TableTd>
                <ActionIcon
                  color="orange"
                  variant="light"
                  onClick={() => handleOpenModal("skils", row.skills)}
                >
                  <IconEye size={14} />
                </ActionIcon>
              </TableTd>
              <TableTd>
                <ActionIcon
                  color="indigo"
                  variant="light"
                  onClick={() =>
                    handleOpenModal(
                      "clients",
                      row.clients.map((data) => data.name)
                    )
                  }
                >
                  <IconEye size={14} />
                </ActionIcon>
              </TableTd>
              <TableTd>
                <ActionIcon
                  color="blue"
                  variant="light"
                  onClick={() =>
                    handleOpenModal(
                      "deals",
                      row.deals.map(
                        (deal) =>
                          `${deal.client} - $${deal.value.toLocaleString()} - ${
                            deal.status
                          }`
                      )
                    )
                  }
                >
                  <IconEye size={14} />
                </ActionIcon>
              </TableTd>
              <TableTd>
                $
                {row.deals
                  .filter((el) => el.status === "Closed Won")
                  .reduce((a, v) => a + v.value, 0)
                  .toLocaleString()}
              </TableTd>
            </>
          )}
        />
      </ScrollArea>
      <Chart data={props.totalDealsPerRep} />
      <Modal
        opened={opened}
        onClose={handleCloseModal}
        title={`Detail ${key.charAt(0).toUpperCase() + key.slice(1)}`}
        centered
      >
        <div>
          {mapDetailModalData.map((item, idx) => {
            if (key === "deals") {
              const colors: Record<string, string> = {
                "Closed Won": "green",
                "Closed Lost": "red",
                "In Progress": "blue",
              };
              const itemData = item.split("-");
              const status = itemData[itemData.length - 1].trim();
              return (
                <Badge
                  key={idx}
                  variant="light"
                  style={{ margin: 5 }}
                  color={colors[`${status}`]}
                >
                  {item}
                </Badge>
              );
            }
            return (
              <Badge
                key={idx}
                color="blue"
                variant="light"
                style={{ margin: 5 }}
              >
                {item}
              </Badge>
            );
          })}
        </div>
      </Modal>
    </Flex>
  );
}
