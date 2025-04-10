"use client";

import { Breadcrumbs as MantineBreadcrumbs, Anchor } from "@mantine/core";

export type BreadcrumbItem = {
  title: string;
  href: string;
};

export default function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  const links = items.map((item, index) => (
    <Anchor
      href={item.href}
      key={index}
      styles={(theme) => ({
        root: {
          fontSize: 14,
          pointerEvents: index === items.length - 1 ? "none" : "auto",
          color:
            index === items.length - 1
              ? theme.colors.gray[7]
              : theme.colors.blue[5],
          "&:hover": {},
        },
      })}
    >
      {item.title}
    </Anchor>
  ));

  return (
    <MantineBreadcrumbs
      styles={() => ({
        separator: {
          fontSize: 14,
        },
      })}
    >
      {links}
    </MantineBreadcrumbs>
  );
}
