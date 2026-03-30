import React from "react";

interface PolicySectionProps {
  children: React.ReactNode;
}

export function PolicySection({ children }: PolicySectionProps) {
  return <section className="space-y-8">{children}</section>;
}

