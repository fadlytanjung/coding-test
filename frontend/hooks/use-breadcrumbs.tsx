"use client";

import { usePathname } from "next/navigation";

export function useBreadcrumbs(baseTitle = "Dashboard") {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  const breadcrumbs = segments.map((segment, index) => {
    const href = "/" + segments.slice(0, index + 1).join("/");
    const title = segment.charAt(0).toUpperCase() + segment.slice(1);
    return { title, href };
  });

  return [{ title: baseTitle, href: "/dashboard" }, ...breadcrumbs.slice(1)];
}
