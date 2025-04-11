"use client";

import { TextInput, PasswordInput, Button, Stack } from "@mantine/core";
import { Controller, useForm } from "react-hook-form";
import { AddUserValues, UpdateUserSchema, UpdateUserValues } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { showNotification } from "@mantine/notifications";
import { updateUserAction } from "./actions";
import { useRouter } from "next/navigation";
import { useAuthUser } from "@/hooks/use-auth-user";

export default function UpdateUserForm({
  data,
}: {
  data: AddUserValues & { id: string };
}) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const user = useAuthUser();
  const role = user?.role;
  const isSysadmin = role === "sysadmin";

  const {
    control,
    handleSubmit,
    formState: { isDirty },
  } = useForm<UpdateUserValues>({
    resolver: zodResolver(UpdateUserSchema),
    mode: "all",
    defaultValues: {
      username: data.username || "",
      fullname: data.fullname || "",
      current_password: "",
      new_password: "",
    },
  });

  const onSubmit = async (values: UpdateUserValues) => {
    setIsSubmitting(true);

    const { username, ...payload } = values;
    const newPayload = {
      ...(data.fullname != values.fullname && {
        fullname: values.fullname,
      }),
      ...(payload.current_password && {
        current_password: payload.current_password,
      }),
      ...(payload.new_password && {
        new_password: payload.new_password,
      }),
    };
    const res = await updateUserAction(newPayload, data.id);
    if (res.status === "success") {
      showNotification({
        title: "Success",
        message: "User updated successfully!",
        color: "green",
      });
      router.back();
    } else {
      showNotification({
        title: "Update Failed",
        message: res.message || "Something went wrong",
        color: "red",
      });
    }
    setIsSubmitting(false);
  };

  return (
    <Stack gap={20} maw={400}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack gap={24}>
          <Controller
            name="username"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TextInput
                {...field}
                label="Username"
                placeholder="Enter username"
                disabled
                withAsterisk
                error={error?.message}
              />
            )}
          />
          <Controller
            name="fullname"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TextInput
                {...field}
                label="Fullname"
                placeholder="Enter fullname"
                withAsterisk
                error={error?.message}
              />
            )}
          />

          <Controller
            name="current_password"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <PasswordInput
                {...field}
                label="Current Password"
                placeholder="Enter current password"
                error={error?.message}
              />
            )}
          />

          <Controller
            name="new_password"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <PasswordInput
                {...field}
                label="New Password"
                placeholder="Enter new password"
                error={error?.message}
              />
            )}
          />

          {isSysadmin && (
            <Button
              type="submit"
              fullWidth
              loading={isSubmitting}
              disabled={!isDirty}
            >
              Submit
            </Button>
          )}
        </Stack>
      </form>
    </Stack>
  );
}
