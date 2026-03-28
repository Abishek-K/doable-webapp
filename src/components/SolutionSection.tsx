import { Zap, Lightbulb, Target } from "lucide-react";

interface Feature {
  icon: React.ReactNode;
  iconBgColor: string;
  title: string;
  description: string;
}

interface Solution {
  title: string;
  color: string;
}

export default function SolutionSection() {
  const features: Feature[] = [
    {
      icon: <Zap className="h-6 w-6" />,
      iconBgColor: "bg-teal-200",
      title: "10-minute insights",
      description:
        "Get the core wisdom of a 300-page book in a fraction of the time.",
    },
    {
      icon: <Lightbulb className="h-6 w-6" />,
      iconBgColor: "bg-teal-200",
      title: "Action-first structure",
      description:
        "Every lesson ends with a D This Now exercise to anchor the learning.",
    },
    {
      icon: <Target className="h-6 w-6" />,
      iconBgColor: "bg-teal-200",
      title: "Real-world focus",
      description:
        "Frameworks built for professionals who need results, not just theories.",
    },
  ];

  const solutions: Solution[] = [
    { title: "Actionable Summaries", color: "bg-blue-300" },
    { title: "Quick Wins", color: "bg-teal-300" },
    { title: "10m Reads", color: "bg-orange-300" },
    { title: "Progress Tracking", color: "bg-slate-200" },
  ];

  return (
    <section className="bg-white px-4 py-16 font-sans sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left Content */}
          <div>
            {/* Badge */}
            <div className="mb-6">
              <span className="inline-block rounded-full bg-teal-100 px-4 py-2 text-xs font-bold uppercase tracking-wider text-teal-700">
                The Solution
              </span>
            </div>

            {/* Heading */}
            <h2 className="mb-6 text-5xl font-bold text-slate-900">
              So we built Doable.
            </h2>

            {/* Subheading */}
            <p className="mb-12 text-lg leading-relaxed text-slate-600">
              We don't just summarize, we synthesize. Doable is a system that
              converts the world's dense books into actionable frameworks
              designed for real-world execution.
            </p>

            {/* Features */}
            <div className="space-y-8">
              {features.map((feature, index) => (
                <div key={index} className="flex gap-4">
                  {/* Icon */}
                  <div className={`${feature.iconBgColor} flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full text-teal-700`}>
                    {feature.icon}
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="font-bold text-slate-900">
                      {feature.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Solution Cards */}
          <div className="flex items-center justify-center">
            <div className="w-full max-w-sm space-y-4">
              {/* Row 1 */}
              <div className="flex gap-4">
                <div className={`${solutions[0].color} flex-1 rounded-3xl p-6 flex items-center justify-center h-32 text-center`}>
                  <p className="font-bold text-slate-900">{solutions[0].title}</p>
                </div>
                <div className={`${solutions[1].color} flex-1 rounded-3xl p-6 flex items-center justify-center h-32 text-center`}>
                  <p className="font-bold text-slate-900">{solutions[1].title}</p>
                </div>
              </div>

              {/* Row 2 */}
              <div className="flex gap-4">
                <div className={`${solutions[2].color} flex-1 rounded-3xl p-6 flex items-center justify-center h-32 text-center`}>
                  <p className="font-bold text-slate-900">{solutions[2].title}</p>
                </div>
                <div className={`${solutions[3].color} flex-1 rounded-3xl p-6 flex items-center justify-center h-32 text-center`}>
                  <p className="font-bold text-slate-900">{solutions[3].title}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
