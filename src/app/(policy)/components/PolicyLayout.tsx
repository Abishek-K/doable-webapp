import React from "react"

interface PolicyLayoutProps {
  children: React.ReactNode
  tag?: string
  title?: string
  subtitle?: string
}

export function PolicyLayout({
  children,
  tag,
  title,
  subtitle,
}: PolicyLayoutProps) {
  const hasPageHeader = Boolean(tag || title || subtitle);

  return (
    <div className="bg-[#FAFAF9]">
      <main className="mx-auto max-w-3xl px-4 py-8 sm:py-12 md:py-16">
        {hasPageHeader ? (
          <div className="mb-12 text-center">
            {tag ? (
              <span className="rounded-full bg-orange-100 px-3 py-1 text-sm font-semibold text-orange-500">
                {tag}
              </span>
            ) : null}
            {title ? (
              <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                {title}
              </h1>
            ) : null}
            {subtitle ? (
              <p className="mt-6 text-lg leading-8 text-gray-600">{subtitle}</p>
            ) : null}
          </div>
        ) : null}
        <div className="space-y-12">{children}</div>
      </main>
    </div>
  )
}
