"use client";

import { useBreadcrumbs } from "@/hooks/use-breadcrumbs";
import { SalesRep } from "@/types/sales";
import {
  TableTd,
  Flex,
  Text,
  Card,
  Group,
  Title,
  Tooltip,
  Badge,
  ActionIcon,
} from "@mantine/core";
import { MetaType } from "../users";
import Breadcrumb from "@/components/atoms/breadcrums";
import DataTable from "@/components/molecules/datatable";
import {
  IconCurrencyDollar,
  IconBuildingStore,
  IconChartBar,
  IconUser,
} from "@tabler/icons-react"; // Use Tabler icons

export default function Home({
  data,
  meta,
  totalDealsValue,
  dealsByClient,
  dealsByRegion,
  dealsByStatus,
  totalDealsPerRep,
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

  const topClients = Object.entries(dealsByClient)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 2);
  const otherClients = Object.entries(dealsByClient)
    .slice(2)
    .map(([client, value]) => `${client}: $${value.toLocaleString()}`);

  const topRegions = Object.entries(dealsByRegion)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 2);
  const otherRegions = Object.entries(dealsByRegion)
    .slice(2)
    .map(([client, value]) => `${client}: $${value.toLocaleString()}`);

  return (
    <Flex direction="column" gap={28}>
      <div>
        <Text fw={700} size="lg" mb={4}>
          List Sales
        </Text>
        <Breadcrumb items={items} />
      </div>

      <Flex gap={16} wrap="wrap">
        <Card
          shadow="sm"
          padding="md"
          radius="md"
          style={{ display: "block" }}
          w="calc(calc(100% - 48px) / 4)"
        >
          <Group align="start" gap={16}>
            <ActionIcon className="mt-[6px]" color="blue" variant="light">
              <IconCurrencyDollar size={20} />
            </ActionIcon>
            <div className="flex flex-col gap-1">
              <Title order={5} c="blue.7">
                Total Deals
              </Title>
              <Text fz={14}>
                {totalDealsValue.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </Text>
            </div>
          </Group>
        </Card>
        <Card
          shadow="sm"
          padding="md"
          radius="md"
          style={{ display: "block" }}
          w="calc(calc(100% - 48px) / 4)"
        >
          <Group align="start" gap={16}>
            <ActionIcon className="mt-[6px]" color="green" variant="light">
              <IconChartBar size={20} />
            </ActionIcon>
            <div className="flex flex-col gap-1">
              <Title order={5} c="green.7">
                Deals by Region
              </Title>
              <div>
                {topRegions.map(([region, value]) => (
                  <Text key={region} fz={14}>
                    {region}: ${value.toLocaleString()}
                  </Text>
                ))}
                {otherRegions.length > 0 && (
                  <Tooltip
                    label={otherRegions.join(", ")}
                    style={{
                      maxWidth: 300,
                      textWrap: "wrap",
                      fontSize: 14,
                    }}
                  >
                    <Badge color="gray" variant="outline" size="sm">
                      {otherRegions.length}+ More
                    </Badge>
                  </Tooltip>
                )}
              </div>
            </div>
          </Group>
        </Card>

        <Card
          shadow="sm"
          padding="md"
          radius="md"
          style={{ display: "block" }}
          w="calc(calc(100% - 48px) / 4)"
        >
          <Group align="start" gap={16}>
            <ActionIcon className="mt-[6px]" color="indigo" variant="light">
              <IconBuildingStore size={20} />
            </ActionIcon>
            <div className="flex flex-col gap-1">
              <Title order={5} c="indigo.7">
                Deals by Client
              </Title>
              <div>
                {topClients.map(([client, value]) => (
                  <Text key={client} fz={14}>
                    {client}: ${value.toLocaleString()}
                  </Text>
                ))}
                {otherClients.length > 0 && (
                  <Tooltip
                    label={otherClients.join(", ")}
                    style={{
                      maxWidth: 300,
                      textWrap: "wrap",
                      fontSize: 14,
                    }}
                  >
                    <Badge color="gray" variant="outline" size="sm">
                      {otherClients.length}+ More
                    </Badge>
                  </Tooltip>
                )}
              </div>
            </div>
          </Group>
        </Card>
        <Card
          shadow="sm"
          padding="md"
          radius="md"
          style={{ display: "block" }}
          w="calc(calc(100% - 48px) / 4)"
        >
          <Group align="start" gap={16}>
            <ActionIcon className="mt-[6px]" color="red" variant="light">
              <IconUser size={20} />
            </ActionIcon>
            <div className="flex flex-col gap-1">
              <Title order={5} c="red.7">
                Deals by Status
              </Title>
              <div>
                {Object.keys(dealsByStatus).map((status, id) => (
                  <Text
                    key={`${status}_${id}`}
                    fz={14}
                  >{`${status}: ${dealsByStatus[status]}`}</Text>
                ))}
              </div>
            </div>
          </Group>
        </Card>
      </Flex>

      <DataTable
        columns={["No", "Name", "Region", "Role"]}
        data={data}
        meta={meta}
        renderRow={(row, i) => (
          <>
            <TableTd>{meta.size * (meta.page - 1) + (i as number) + 1}</TableTd>
            <TableTd>{row.name}</TableTd>
            <TableTd>{row.region}</TableTd>
            <TableTd>{row.role}</TableTd>
          </>
        )}
      />
    </Flex>
  );
}
