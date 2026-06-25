"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

const categories = [
  { label: "Productivity & Habits", icon: "/images/categories/productivity-habits.svg" },
  { label: "Business & Career", icon: "/images/categories/business-career.svg" },
  { label: "Psychology & Thinking", icon: "/images/categories/psychology-thinking.svg" },
  { label: "Money & Influence", icon: "/images/categories/money-influence.svg" },
  { label: "Mind & Wellbeing", icon: "/images/categories/mind-wellbeing.svg" },
  { label: "Relationships & Communication", icon: "/images/categories/relationships-communication.svg" },
];

export default function CategoryCardsSection() {
  const [selectedIndexes, setSelectedIndexes] = useState<number[]>([]);

  const toggleCategory = (index: number) => {
    setSelectedIndexes((prev) =>
      prev.includes(index)
        ? prev.filter((item) => item !== index)
        : [...prev, index]
    );
  };

  return (
    <section className="bg-white px-6 py-[64px] font-sans lg:px-12">
      <div className="mx-auto w-full max-w-[1440px]">
        <h2 className="mx-auto mb-12 max-w-3xl text-center text-[2.1rem] font-semibold tracking-tight text-[#2c2c2c] sm:text-[2.5rem]">
          What do you want to improve right now?
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {categories.map(({ label, icon }, index) => {
            const isSelected = selectedIndexes.includes(index);

            return (
              <button
                key={label}
                type="button"
                onClick={() => toggleCategory(index)}
                className={cn(
                  "group flex h-[98px] w-full items-center justify-between rounded-2xl border bg-white px-6 py-6 text-left outline-none transition-all duration-200 ease-in-out",
                  "hover:-translate-y-[3px] hover:shadow-[0_10px_20px_rgba(15,23,42,0.08)] hover:border-[#d5d5d5]",
                  "focus-visible:ring-2 focus-visible:ring-[#1a73e8]/30 focus-visible:ring-offset-2 focus-visible:ring-offset-white",
                  isSelected
                    ? "border-[#1a73e8] bg-[#f0f6ff]"
                    : "border-[#e6e6e6]"
                )}
                aria-pressed={isSelected}
              >
                <span className="pr-4 text-[1.15rem] font-medium leading-snug text-[#333333]">
                  {label}
                </span>

                <span className="flex shrink-0 items-center gap-3">
                  <Image
                    src={icon}
                    alt=""
                    aria-hidden="true"
                    width={48}
                    height={48}
                    className="h-12 w-12"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className={cn(
                      "h-5 w-5 text-[#6b7280] transition-transform duration-200 ease-in-out group-hover:translate-x-1",
                      isSelected ? "translate-x-1 text-[#1a73e8]" : ""
                    )}
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m9 18 6-6-6-6"
                    />
                  </svg>
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
