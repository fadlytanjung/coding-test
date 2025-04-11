"use client";

import { usePathname } from "next/navigation";

export function useBreadcrumbs(baseTitle = "Dashboard") {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  const isIdInLastSegment = segments[segments.length - 1] && !isNaN(Number(segments[segments.length - 1]));

  const filteredSegments = isIdInLastSegment
    ? segments.slice(0, segments.length - 1)
    : segments;

  const breadcrumbs = filteredSegments.map((segment, index) => {
    const href = "/" + filteredSegments.slice(0, index + 1).join("/");
    const title = segment.charAt(0).toUpperCase() + segment.slice(1);
    return { title, href };
  });

  return [{ title: baseTitle, href: "/dashboard" }, ...breadcrumbs.slice(1)];
}
