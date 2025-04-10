"use client";

import { TextInput, PasswordInput, Button, Stack } from "@mantine/core";
import { Controller, useForm } from "react-hook-form";
import { AddUserSchema, AddUserValues } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { showNotification } from "@mantine/notifications";
import { createUserAction } from "./actions";
import { useRouter } from "next/navigation";

export default function AddUserForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { control, handleSubmit } = useForm<AddUserValues>({
    resolver: zodResolver(AddUserSchema),
    defaultValues: {
      username: "",
      fullname: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: AddUserValues) => {
    setIsSubmitting(true);

    const res = await createUserAction(values);

    if (res.status === "success") {
      showNotification({
        title: "Success",
        message: "User created successfully!",
        color: "green",
      });
      router.push("/dashboard/users");
    } else {
      showNotification({
        title: "Add User Failed",
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
                onChange={(e) => {
                  const value = e.target.value.replace(/[^a-zA-Z0-9_]/g, "");
                  field.onChange(value);
                }}
                label="Username"
                placeholder="Enter username"
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
            name="password"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <PasswordInput
                {...field}
                label="Password"
                placeholder="Enter password"
                withAsterisk
                error={error?.message}
              />
            )}
          />
          <Controller
            name="confirmPassword"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <PasswordInput
                {...field}
                label="Confirm Password"
                placeholder="Re-enter password"
                withAsterisk
                error={error?.message}
              />
            )}
          />
          <Button type="submit" fullWidth loading={isSubmitting}>
            Submit
          </Button>
        </Stack>
      </form>
    </Stack>
  );
}
