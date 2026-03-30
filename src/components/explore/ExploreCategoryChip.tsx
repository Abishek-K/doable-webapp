"use client";

import { cn } from "@/lib/utils";

type ChipVariant = "hero" | "sortActive" | "sortInactive";

type ExploreCategoryChipProps = {
  label: string;
  variant: ChipVariant;
  onClick?: () => void;
  className?: string;
};

export default function ExploreCategoryChip({
  label,
  variant,
  onClick,
  className,
}: ExploreCategoryChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "shrink-0 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors",
        variant === "hero" &&
          "bg-[#E5E5E5] text-[#404040] hover:bg-[#d4d4d4]",
        variant === "sortActive" && "bg-[#A34E0C] text-white shadow-sm hover:bg-[#8c430a]",
        variant === "sortInactive" &&
          "bg-[#ebe8e2] text-[#4b5563] hover:bg-[#e0ddd6]",
        className
      )}
    >
      {label}
    </button>
  );
}
