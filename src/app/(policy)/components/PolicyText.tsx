import React from "react";

interface PolicyTextProps {
  children: React.ReactNode;
  className?: string;
}

export function PolicyText({ children, className = "" }: PolicyTextProps) {
  return (
    <p className={`text-base leading-7 text-gray-700 ${className}`.trim()}>
      {children}
    </p>
  );
}

