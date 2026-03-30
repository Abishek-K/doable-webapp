import React from "react";

interface PolicyHeadingProps {
  children: React.ReactNode;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}

export function PolicyHeading({
  children,
  level = 1,
}: PolicyHeadingProps) {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;

  return (
    <Tag className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
      {children}
    </Tag>
  );
}

