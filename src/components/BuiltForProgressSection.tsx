export default function BuiltForProgressSection() {
  const stats = [
    { value: "1,000+", label: "Active Learners" },
    { value: "450+", label: "Action Guides" },
  ];

  const testimonials = [
    {
      quote:
        '"I used to feel guilty about not finishing books. Now I actually implement the best parts in my daily workflow."',
      name: "Sarah J.",
      role: "Product Lead",
      avatarColor: "#E8845C",
    },
    {
      quote:
        '"The only learning platform that doesn\'t just ask me to watch more. It asks me to do more. Total game changer."',
      name: "Marcus T.",
      role: "Entrepreneur",
      avatarColor: "#7DD5BC",
    },
    {
      quote:
        '"Finally, a way to keep up with the knowledge I need without spending my entire weekend reading."',
      name: "Elena R.",
      role: "Creative Director",
      avatarColor: "#6BA8D4",
    },
  ];

  return (
    <section
      className="px-4 py-16 font-sans sm:px-6 sm:py-24 lg:px-8"
      style={{ backgroundColor: "#EDEAE4" }}
    >
      <div className="mx-auto w-full max-w-5xl">
        {/* Heading */}
        <h2 className="text-center text-3xl font-bold text-slate-900 sm:text-4xl lg:text-5xl">
          Built for people who want progress.
        </h2>

        {/* Stats */}
        <div className="mt-6 flex items-center justify-center gap-8 sm:gap-12">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <p
                className="text-3xl font-bold sm:text-4xl"
                style={{ color: "#92400E" }}
              >
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-slate-500">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Testimonial Cards */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="flex flex-col justify-between rounded-2xl px-6 py-7 sm:px-7 sm:py-8"
              style={{ backgroundColor: "#E5E2DC" }}
            >
              {/* Quote */}
              <p
                className="text-sm leading-relaxed text-slate-700"
                style={{ fontStyle: "italic" }}
              >
                {testimonial.quote}
              </p>

              {/* Author */}
              <div className="mt-6 flex items-center gap-3">
                <div
                  className="h-8 w-8 flex-shrink-0 rounded-full"
                  style={{ backgroundColor: testimonial.avatarColor }}
                />
                <p className="text-sm font-medium text-slate-700">
                  {testimonial.name} — {testimonial.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
