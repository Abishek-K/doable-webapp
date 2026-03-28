import { AlertCircle, BookOpen, BarChart3, Zap } from "lucide-react";

interface Problem {
  icon: React.ReactNode;
  iconColor: string;
  title: string;
  description: string;
}

export default function LearningBrokenSection() {
  const problems: Problem[] = [
    {
      icon: <BookOpen className="h-8 w-8" />,
      iconColor: "text-red-500",
      title: "Books take too long",
      description:
        "The average person takes 8 hours to finish a book, most of which is filler.",
    },
    {
      icon: <AlertCircle className="h-8 w-8" />,
      iconColor: "text-red-500",
      title: "Passive content",
      description:
        "We consume 100,000 words a day but forget 90% of them within 48 hours.",
    },
    {
      icon: <AlertCircle className="h-8 w-8" />,
      iconColor: "text-red-500",
      title: "No clear action",
      description:
        "Information overload without a roadmap leads to analysis paralysis.",
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      iconColor: "text-red-500",
      title: "Rarely results",
      description:
        "Collecting knowledge feels like progress, but true growth requires action.",
    },
  ];

  return (
    <section className="bg-slate-100 px-4 py-16 font-sans sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        {/* Header */}
        <div className="mb-16 max-w-2xl">
          <h2 className="text-5xl font-bold text-slate-900">
            Learning is broken.
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            The way we consume information today creates a gap between what we
            know and what we actually do.
          </p>
        </div>

        {/* Problems Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {problems.map((problem, index) => (
            <div
              key={index}
              className="rounded-2xl bg-white p-8 shadow-sm transition-shadow hover:shadow-md"
            >
              {/* Icon */}
              <div className={`mb-6 ${problem.iconColor}`}>
                {problem.icon}
              </div>

              {/* Title */}
              <h3 className="mb-3 text-lg font-bold text-slate-900">
                {problem.title}
              </h3>

              {/* Description */}
              <p className="text-base leading-relaxed text-slate-600">
                {problem.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
