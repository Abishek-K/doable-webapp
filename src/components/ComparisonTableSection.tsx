import { Check } from "lucide-react";

interface ComparisonFeature {
  name: string;
  free: string | boolean;
  premium: string | boolean;
}

export default function ComparisonTableSection() {
  const features: ComparisonFeature[] = [
    {
      name: "Monthly Access",
      free: "3 Summaries",
      premium: "Unlimited",
    },
    {
      name: "Audio Versions",
      free: false,
      premium: true,
    },
    {
      name: "Action Plans",
      free: false,
      premium: true,
    },
    {
      name: "Offline Mode",
      free: false,
      premium: true,
    },
    {
      name: "Priority Support",
      free: false,
      premium: true,
    },
  ];

  return (
    <section className="bg-white px-4 py-16 font-sans sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto w-full max-w-4xl">
        {/* Heading */}
        <h2 className="text-4xl font-bold text-[#1a1a1a] text-center mb-12">
          Compare the plans
        </h2>

        {/* Comparison Table */}
        <div className="overflow-hidden rounded-2xl border border-slate-200">
          <div className="overflow-x-auto">
            <table className="w-full">
            {/* Table Header */}
            <thead>
              <tr className="bg-slate-100">
                <th className="px-6 py-4 text-left font-semibold text-[#1a1a1a]">
                  Feature
                </th>
                <th className="px-6 py-4 text-center font-semibold text-[#1a1a1a]">
                  Free
                </th>
                <th className="px-6 py-4 text-center font-semibold text-[#1a73e8]">
                  Premium
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-slate-200">
              {features.map((feature, index) => (
                <tr key={index} className="hover:bg-slate-50 transition-colors">
                  {/* Feature Name */}
                  <td className="px-6 py-5 font-medium text-[#2b2b2b]">
                    {feature.name}
                  </td>

                  {/* Free Column */}
                  <td className="px-6 py-5 text-center">
                    {typeof feature.free === "boolean" ? (
                      feature.free ? (
                        <Check className="h-5 w-5 text-[#1a73e8] mx-auto" />
                      ) : (
                        <span className="text-slate-400 text-lg">−</span>
                      )
                    ) : (
                      <span className="text-[#2b2b2b]">{feature.free}</span>
                    )}
                  </td>

                  {/* Premium Column */}
                  <td className="px-6 py-5 text-center">
                    {typeof feature.premium === "boolean" ? (
                      feature.premium ? (
                        <Check className="h-5 w-5 text-[#1a73e8] mx-auto" />
                      ) : (
                        <span className="text-slate-400 text-lg">−</span>
                      )
                    ) : (
                      <span className="text-[#1a73e8] font-semibold">
                        {feature.premium}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>
      </div>
    </section>
  );
}
