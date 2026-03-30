"use client";

import { Search } from "lucide-react";

type ExploreSearchBarProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function ExploreSearchBar({
  value,
  onChange,
}: ExploreSearchBarProps) {
  return (
    <div className="relative mx-auto w-full max-w-2xl">
      <Search
        className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-[#9ca3af]"
        strokeWidth={2}
        aria-hidden
      />
      <input
        id="explore-search-focus"
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search by book title, author, or topic..."
        className="w-full rounded-full border-0 bg-white py-4 pl-14 pr-6 text-base text-[#1f2937] shadow-[0_4px_24px_rgba(15,23,42,0.08)] outline-none ring-1 ring-black/[0.04] placeholder:text-[#9ca3af] transition-shadow focus:ring-2 focus:ring-[#A34E0C]/25"
        autoComplete="off"
        spellCheck={false}
      />
    </div>
  );
}
