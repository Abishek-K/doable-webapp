"use client";

import { useState } from "react";

export default function MarkCompleteSection() {
  const [complete, setComplete] = useState(false);

  return (
    <section className="bg-[#FCFAF7] px-4 pb-20 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl justify-center">
        <button
          type="button"
          disabled={complete}
          onClick={() => setComplete(true)}
          className="rounded-full bg-[#136058] px-12 py-4 text-base font-bold text-white shadow-[0_10px_28px_rgba(19,96,88,0.35)] transition enabled:hover:bg-[#0f524c] disabled:cursor-default disabled:opacity-90"
        >
          {complete ? "Marked complete — great work!" : "Mark as Complete"}
        </button>
      </div>
    </section>
  );
}
