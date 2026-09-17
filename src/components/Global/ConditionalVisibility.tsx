"use client";

import { usePathname } from "next/navigation";
import React from "react";

interface Props {
  children: React.ReactNode;
  hiddenRoutes: string[];
}

export default function ConditionalVisibility({ children, hiddenRoutes }: Props) {
  const pathname = usePathname();
  
  const isHidden = hiddenRoutes.some((route) => {
    if (pathname === route) return true;
    if (pathname.startsWith(`${route}/`)) return true;
    return false;
  });

  if (isHidden) {
    return null;
  }
  
  return <>{children}</>;
}
