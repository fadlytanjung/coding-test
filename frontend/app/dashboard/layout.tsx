"use client";

import {
  AppShell,
  UnstyledButton,
  Group,
  Text,
  Box,
  ScrollArea,
  Stack,
  ActionIcon,
  Tooltip,
} from "@mantine/core";
import {
  IconLogout,
  IconLayoutDashboard,
  IconUser,
  IconMenu2,
} from "@tabler/icons-react";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { logoutAction } from "@/ui/login/actions";
import { useMediaQuery } from "@mantine/hooks";

const menu = [
  { label: "Dashboard", icon: IconLayoutDashboard, href: "/dashboard" },
  { label: "Users", icon: IconUser, href: "/dashboard/users" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const isMobile = useMediaQuery("(max-width: 768px)");

  const toggleNavbar = () => {
    setCollapsed((prev) => !prev);
  };

  return (
    <AppShell
      navbar={{
        width: collapsed ? 73 : 200,
        breakpoint: "sm",
        collapsed: { mobile: !collapsed },
      }}
      padding="md"
      header={{ height: 60 }}
      footer={{ height: 40 }}
    >
      <AppShell.Header withBorder={true} px={24} py="md">
        <Group justify="space-between">
          <Group>
            <ActionIcon variant="subtle" onClick={toggleNavbar}>
              <IconMenu2 />
            </ActionIcon>
            <Text fw={700}>InterOpera Dashboard</Text>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar
        py="lg"
        px="sm"
        withBorder
        h="calc(100vh - 60px)"
        {...(isMobile && { w: 200 })}
      >
        <Box
          style={{ height: "100%", display: "flex", flexDirection: "column" }}
        >
          <ScrollArea style={{ flexGrow: 1 }}>
            <Stack gap={0}>
              {menu.map(({ label, icon: Icon, href }) => {
                const activeHref = menu
                  .map((item) => item.href)
                  .sort((a, b) => b.length - a.length)
                  .find(
                    (href) =>
                      pathname === href || pathname.startsWith(`${href}/`)
                  );

                const isActive = href === activeHref;

                return (
                  <UnstyledButton
                    key={label}
                    onClick={() => {
                      router.push(href);
                      if (isMobile) {
                        toggleNavbar();
                      }
                    }}
                    p="sm"
                    {...(isActive && {
                      bg: "var(--mantine-color-blue-light-hover, var(--mantine-primary-color-filled-hover))",
                    })}
                    className={`${
                      !collapsed || (isMobile && collapsed)
                        ? "items-center gap-2"
                        : "justify-center"
                    } flex rounded-md px-2 py-2 transition-colors`}
                  >
                    <Tooltip
                      label={label}
                      disabled={!collapsed}
                      position="right"
                    >
                      <Icon
                        size={24}
                        color={
                          isActive
                            ? "var(--mantine-primary-color-filled-hover)"
                            : undefined
                        }
                      />
                    </Tooltip>

                    {(!collapsed || (isMobile && collapsed)) && (
                      <Text
                        size="sm"
                        c={
                          isActive
                            ? "var(--mantine-primary-color-filled-hover)"
                            : undefined
                        }
                        style={{
                          fontWeight: 600,
                          fontSize: 14,
                        }}
                      >
                        {label}
                      </Text>
                    )}
                  </UnstyledButton>
                );
              })}
            </Stack>
          </ScrollArea>

          <Box mt="md" pt="md">
            <Group
              justify={
                !collapsed || (isMobile && collapsed) ? "flex-start" : "center"
              }
              onClick={async () => {
                await logoutAction();
                router.push("/login");
              }}
              className="cursor-pointer"
            >
              <Tooltip label="Logout" position="right">
                <ActionIcon variant="light" color="red">
                  <IconLogout size={16} />
                </ActionIcon>
              </Tooltip>
              {(!collapsed || (isMobile && collapsed)) && (
                <Text size="sm">Logout</Text>
              )}
            </Group>
          </Box>
        </Box>
      </AppShell.Navbar>
      <AppShell.Footer h="40px">
        {
          <Text
            size="sm"
            ta="center"
            w="100%"
            h="100%"
            className="flex justify-center items-center w-full"
          >
            © InterOpera {new Date().getFullYear()}
          </Text>
        }
      </AppShell.Footer>

      <AppShell.Main>
        <div>{children}</div>
      </AppShell.Main>
    </AppShell>
  );
}
