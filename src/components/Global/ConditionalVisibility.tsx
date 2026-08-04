"use client";

import { usePathname } from "next/navigation";
import React from "react";

interface Props {
  children: React.ReactNode;
  hiddenRoutes: string[];
}

export default function ConditionalVisibility({ children, hiddenRoutes }: Props) {
  const pathname = usePathname();
  
  if (hiddenRoutes.includes(pathname)) {
    return null;
  }
  
  return <>{children}</>;
}
