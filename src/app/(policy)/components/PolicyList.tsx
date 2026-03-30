import React from "react";

interface PolicyListProps {
  items: string[];
}

export function PolicyList({ items }: PolicyListProps) {
  return (
    <ul className="mt-4 space-y-3 pl-5 text-base leading-7 text-gray-700 list-disc">
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}

