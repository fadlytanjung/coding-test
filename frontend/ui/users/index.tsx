"use client";

import { ActionIcon, Button, Flex, Modal, TableTd, Text } from "@mantine/core";
import { IconEdit, IconPlus, IconTrash } from "@tabler/icons-react";
import { useAuthUser } from "@/hooks/use-auth-user";
import { useBreadcrumbs } from "@/hooks/use-breadcrumbs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import { deleteUserAction } from "./actions";
import DataTable from "@/components/molecules/datatable";
import Breadcrumb from "@/components/atoms/breadcrums";
import Link from "next/link";

type UserType = {
  id: number;
  fullname: string;
  username: string;
  role: string;
};

export type MetaType = {
  total_data: number;
  total_page: number;
  total_data_on_page: number;
  page: number;
  size: number;
};

export default function User({
  data,
  meta,
}: {
  data: UserType[];
  meta: MetaType;
}) {
  const router = useRouter();
  const user = useAuthUser();
  const items = useBreadcrumbs();

  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [opened, { open, close }] = useDisclosure(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const role = user?.role;
  const isSysadmin = user?.role === "sysadmin";

  const handleOpenDelete = (id: number) => {
    setSelectedId(id);
    open();
  };

  const handleConfirmDelete = async () => {
    if (!selectedId) return;
    setIsDeleting(true);

    const res = await deleteUserAction(selectedId);
    if (res.status === "success") {
      showNotification({
        title: "User deleted",
        message: "User has been successfully deleted.",
        color: "green",
      });
    } else {
      showNotification({
        title: "Delete failed",
        message: res.message,
        color: "red",
      });
    }
    setIsDeleting(false);
    close();
    setSelectedId(null);
  };

  const toAdd = () => {
    router.push("/dashboard/users/add");
  };

  return (
    <Flex direction="column" gap={28}>
      <div>
        <Text fw={700} size="lg" mb={4}>
          List Users
        </Text>
        <Breadcrumb items={items} />
      </div>
      <DataTable
        columns={[
          "No",
          "Username",
          "Fullname",
          "Role",
          ...(isSysadmin ? ["Action"] : []),
        ]}
        data={data}
        meta={meta}
        {...(isSysadmin && {
          headerRightSection: (
            <Button
              variant="light"
              onClick={() => toAdd()}
              leftSection={<IconPlus size={14} />}
            >
              Add User
            </Button>
          ),
        })}
        renderRow={(row, i) => (
          <>
            <TableTd>{meta.size * (meta.page - 1) + (i as number) + 1}</TableTd>
            <TableTd>{row.username}</TableTd>
            <TableTd>{row.fullname}</TableTd>
            <TableTd>{row.role}</TableTd>
            {isSysadmin && (
              <TableTd>
                <Flex gap="sm">
                  <Link href={`/dashboard/users/edit/${row.id}`}>
                    <ActionIcon color="blue" variant="light">
                      <IconEdit size={16} />
                    </ActionIcon>
                  </Link>
                  {role != row.role && !!role && (
                    <ActionIcon
                      color="red"
                      variant="light"
                      onClick={() => handleOpenDelete(row.id)}
                    >
                      <IconTrash size={16} />
                    </ActionIcon>
                  )}
                </Flex>
              </TableTd>
            )}
          </>
        )}
      />
      <Modal
        opened={opened}
        onClose={close}
        title="Delete Confirmation"
        centered
      >
        <Text mb="md">Are you sure you want to delete this user?</Text>
        <Flex justify="flex-end" gap="sm">
          <Button variant="default" onClick={close}>
            Cancel
          </Button>
          <Button
            color="red"
            onClick={() => handleConfirmDelete()}
            loading={isDeleting}
          >
            Submit
          </Button>
        </Flex>
      </Modal>
    </Flex>
  );
}
