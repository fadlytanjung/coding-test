"use client";

import {
  TextInput,
  PasswordInput,
  Button,
  Title,
  Center,
  Box,
  Stack,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, LoginValues } from "./schema";
import { loginAction } from "./actions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

export default function LoginForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { control, handleSubmit } = useForm<LoginValues>({
    resolver: zodResolver(LoginSchema),
    mode: "onChange",
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginValues) => {
    setIsSubmitting(true);
    const res = await loginAction(data);

    setIsSubmitting(false);
    if (!res.success) {
      showNotification({
        title: "Login failed",
        message: res.error,
        color: "red",
      });
    } else {
      showNotification({
        title: "Login success",
        message: "Welcome back!",
        color: "green",
      });
      router.push("/dashboard");
    }
  };
  return (
    <Center className="min-h-screen bg-[#f6f6fb]">
      <Box w={360} p="lg" bg="white" style={{ borderRadius: 12 }}>
        <Stack gap={20}>
          <Center>
            <Image alt="logo" src="/logo.png" width={65} height={32} />
          </Center>
          <Title order={3} ta="center">
            Welcome to InterOpera Dashboard
          </Title>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack gap={24}>
              <Controller
                name="username"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <TextInput
                    {...field}
                    {...(error?.message && {
                      error: error.message,
                    })}
                    label="Username"
                    placeholder="Enter username"
                    withAsterisk
                  />
                )}
              />

              <Controller
                name="password"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <PasswordInput
                    {...field}
                    {...(error?.message && {
                      error: error.message,
                    })}
                    label="Password"
                    placeholder="Enter password"
                    withAsterisk
                  />
                )}
              />

              <Button type="submit" fullWidth loading={isSubmitting}>
                Login
              </Button>
            </Stack>
          </form>
        </Stack>
      </Box>
    </Center>
  );
}
