"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface AdminPageHeaderProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
  badge?: string;
}

export function AdminPageHeader({
  title,
  description,
  children,
  className,
  badge
}: AdminPageHeaderProps) {
  return (
    <div className={cn("flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-10", className)}>
      <div className="space-y-1.5">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          {title}
        </h1>
        {description && (
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed">
            {description}
          </p>
        )}
      </div>
      <div className="flex items-center gap-3">
        {children}
      </div>
    </div>
  );
}
