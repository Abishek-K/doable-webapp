import Image from "next/image";

interface Testimonial {
  quote: string;
  name: string;
  title: string;
  avatar: string;
}

export default function TrustedBySection() {
  const testimonials: Testimonial[] = [
    {
      quote:
        "Doable is the only app that actually helped me implement what I read. The action plans are a game changer.",
      name: "David Chen",
      title: "Product Manager",
      avatar:
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='50' fill='%238B7355'/%3E%3C/svg%3E",
    },
    {
      quote:
        "I listen to the summaries during my morning run. It's the most productive part of my entire day.",
      name: "Sarah Jenkins",
      title: "Creative Director",
      avatar:
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='50' fill='%23D4A574'/%3E%3C/svg%3E",
    },
  ];

  return (
    <section className="bg-[#f7f5f2] px-4 py-16 font-sans sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto w-full max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-sm font-bold text-[#a38200] tracking-widest uppercase mb-3">
            Trusted by the best
          </p>
          <h2 className="text-4xl font-bold text-[#1a1a1a] sm:text-5xl">
            Join 50,000+ high-performers transforming knowledge into action.
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid gap-8 md:grid-cols-2">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="rounded-2xl bg-white p-8 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex gap-4 mb-4">
                {/* Avatar */}
                <div className="flex-shrink-0">
                  <div className="h-14 w-14 rounded-full bg-gradient-to-br from-slate-300 to-slate-400 overflow-hidden">
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-2xl">👤</div>
                    </div>
                  </div>
                </div>

                {/* Quote and Attribution */}
                <div className="flex-1">
                  <p className="text-[#2b2b2b] italic leading-relaxed mb-3">
                    "{testimonial.quote}"
                  </p>
                  <div>
                    <p className="font-semibold text-[#1a1a1a]">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-[#5a5a5a]">
                      {testimonial.title}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
