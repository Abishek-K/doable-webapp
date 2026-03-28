export default function OldVsDoableSection() {
  const oldWayItems = [
    "Hours of passive reading",
    "Theories with no examples",
    "Easily forgotten content",
    "Zero accountability for change",
  ];

  const doableWayItems = [
    "10-minute focus sessions",
    "Step-by-step frameworks",
    "Embedded action exercises",
    "Continuous progress tracking",
  ];

  return (
    <section className="bg-white px-4 py-16 font-sans sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto w-full max-w-4xl">
        {/* Comparison Card */}
        <div
          className="overflow-hidden rounded-2xl border border-gray-100 shadow-sm"
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}
        >
          {/* The Old Way - Left Side */}
          <div className="bg-white px-8 py-10 sm:px-10 sm:py-12">
            <h3 className="mb-8 text-2xl font-bold text-slate-900">
              The Old Way
            </h3>
            <div className="space-y-6">
              {oldWayItems.map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="flex-shrink-0"
                  >
                    <path
                      d="M12 4L4 12M4 4L12 12"
                      stroke="#DC6B6B"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="text-sm text-slate-600">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* The Doable Way - Right Side */}
          <div
            className="px-8 py-10 sm:px-10 sm:py-12"
            style={{
              backgroundColor: "#E8F5F0",
              borderRadius: "16px",
            }}
          >
            <h3
              className="mb-1 text-2xl font-bold"
              style={{ color: "#1A7A6E" }}
            >
              The Doable Way
            </h3>
            <p
              className="mb-8 text-xs font-bold uppercase tracking-widest"
              style={{ color: "#3D6B64" }}
            >
              Built for execution, not consumption
            </p>
            <div className="space-y-6">
              {doableWayItems.map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="flex-shrink-0"
                  >
                    <path
                      d="M2 8.5L6 12.5L14 4.5"
                      stroke="#1A7A6E"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span
                    className="text-sm font-medium"
                    style={{ color: "#2D5A53" }}
                  >
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
