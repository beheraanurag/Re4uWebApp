"use client";

import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown, Filter } from "lucide-react";
import type { Service } from "@/lib/types";

type FilterOption =
  | "all"
  | "editing"
  | "data"
  | "planning"
  | "presentations";

export function ServicesFilter({ services }: { services: Service[] }) {
  const [selectedFilter, setSelectedFilter] =
    useState<FilterOption>("all");

  const filterOptions: { value: FilterOption; label: string }[] = [
    { value: "all", label: "All Services" },
    { value: "editing", label: "Editing Support" },
    { value: "data", label: "Data Services" },
    { value: "planning", label: "Research Planning" },
    { value: "presentations", label: "Presentations" },
  ];

  const getFilterLabel = () => {
    return (
      filterOptions.find((opt) => opt.value === selectedFilter)?.label ||
      "All Services"
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="inline-flex items-center gap-2 rounded-full border border-[rgba(221,230,236,.95)] bg-[rgba(255,255,255,.92)] px-4 py-2.5 text-sm font-semibold text-[var(--ink)] shadow-[0_10px_20px_rgba(20,35,45,.08)] hover:bg-white"
        >
          <Filter className="h-4 w-4" />
          <span>{getFilterLabel()}</span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[200px]">
        {filterOptions.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => setSelectedFilter(option.value)}
            className={`cursor-pointer ${
              selectedFilter === option.value
                ? "bg-[rgba(47,111,104,.10)] font-semibold"
                : ""
            }`}
          >
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
