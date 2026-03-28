import { Zap, Lightbulb, Clock } from "lucide-react";

interface BenefitCard {
  icon: React.ReactNode;
  iconBgColor: string;
  title: string;
  description: string;
}

export default function WhyUpgradeSection() {
  const benefits: BenefitCard[] = [
    {
      icon: <Zap className="h-6 w-6" />,
      iconBgColor: "bg-teal-300",
      title: "Learn 10x Faster",
      description:
        "Cut through the fluff and get directly to the core mental models of the world's best authors.",
    },
    {
      icon: <Lightbulb className="h-6 w-6" />,
      iconBgColor: "bg-orange-300",
      title: "Apply Ideas Daily",
      description:
        "Each summary includes an interactive worksheet to turn abstract theory into immediate habit.",
    },
    {
      icon: <Clock className="h-6 w-6" />,
      iconBgColor: "bg-blue-300",
      title: "Save 40+ Hours/Month",
      description:
        "Reclaim your time while staying ahead. Absorb a book's worth of wisdom in the time it takes to brew coffee.",
    },
  ];

  return (
    <section className="bg-slate-50 px-4 py-16 font-sans sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto w-full max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 sm:text-5xl">
            Why upgrade to Premium?
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Designed for deep learning, not just fast reading.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid gap-8 md:grid-cols-3">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="rounded-3xl bg-white p-8 text-center shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Icon Circle */}
              <div className="flex justify-center mb-6">
                <div
                  className={`${benefit.iconBgColor} rounded-full h-16 w-16 flex items-center justify-center text-slate-700`}
                >
                  {benefit.icon}
                </div>
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-slate-900 mb-4">
                {benefit.title}
              </h3>

              {/* Description */}
              <p className="text-base leading-relaxed text-slate-600">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
