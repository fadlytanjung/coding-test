"use client";

import { ActionIcon, Flex, Text } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { useBreadcrumbs } from "@/hooks/use-breadcrumbs";
import { useRouter } from "next/navigation";
import { AddUserValues } from "./schema";
import EditUserForm from "./edit-user-form";
import Breadcrumb from "@/components/atoms/breadcrums";

export default function EditUser({ data }: { data: AddUserValues & { id: string} }) {
  const router = useRouter();
  const items = useBreadcrumbs();

  const back = () => {
    router.back();
  };

  return (
    <Flex direction="column" gap={28}>
      <div>
        <Flex gap={8} mb={4}>
          <ActionIcon color="blue" variant="subtle" onClick={() => back()}>
            <IconArrowLeft size={14} />
          </ActionIcon>
          <Text fw={700} size="lg">
            Edit User
          </Text>
        </Flex>
        <Breadcrumb items={items} />
      </div>
      <EditUserForm data={data} />
    </Flex>
  );
}
