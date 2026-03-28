"use client";

import { useState } from "react";
import Link from "next/link";
import { Check } from "lucide-react";

type BillingPeriod = "monthly" | "yearly";

interface PricingFeature {
  name: string;
  included: boolean;
}

interface PricingPlan {
  name: string;
  description: string;
  price: number;
  period: string;
  badge?: string;
  features: PricingFeature[];
  buttonText: string;
  buttonHref: string;
  isPopular?: boolean;
}

export default function PricingSection() {
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>("monthly");

  const monthlyPlans: PricingPlan[] = [
    {
      name: "Free",
      description: "The basics for curious minds",
      price: 0,
      period: "/month",
      features: [
        { name: "3 summaries per month", included: true },
        { name: "Basic curated library access", included: true },
        { name: "No audio versions", included: false },
      ],
      buttonText: "Start Free",
      buttonHref: "/signup",
    },
    {
      name: "Premium",
      description: "Unlimited growth for high-performers",
      price: 9.99,
      period: "/month",
      badge: "MOST POPULAR",
      isPopular: true,
      features: [
        { name: "Unlimited summaries & insights", included: true },
        { name: "Audio + Text for all titles", included: true },
        { name: "Actionable Action Plans", included: true },
        { name: "Offline Access for commutes", included: true },
        { name: "New summaries added weekly", included: true },
      ],
      buttonText: "Start Premium",
      buttonHref: "/signup",
    },
  ];

  const yearlyPlans: PricingPlan[] = [
    {
      name: "Free",
      description: "The basics for curious minds",
      price: 0,
      period: "/month",
      features: [
        { name: "3 summaries per month", included: true },
        { name: "Basic curated library access", included: true },
        { name: "No audio versions", included: false },
      ],
      buttonText: "Start Free",
      buttonHref: "/signup",
    },
    {
      name: "Premium",
      description: "Unlimited growth for high-performers",
      price: 71.88,
      period: "/year",
      badge: "MOST POPULAR",
      isPopular: true,
      features: [
        { name: "Unlimited summaries & insights", included: true },
        { name: "Audio + Text for all titles", included: true },
        { name: "Actionable Action Plans", included: true },
        { name: "Offline Access for commutes", included: true },
        { name: "New summaries added weekly", included: true },
      ],
      buttonText: "Start Premium",
      buttonHref: "/signup",
    },
  ];

  const plans = billingPeriod === "monthly" ? monthlyPlans : yearlyPlans;

  return (
    <section className="bg-white px-4 py-12 font-sans sm:px-6 sm:py-16 lg:px-8">
      <div className="mx-auto w-full max-w-5xl">
        {/* Billing Toggle */}
        <div className="flex flex-col items-center gap-6">
          {/* Toggle Container with Grey Border */}
          <div className="rounded-full border border-slate-300 bg-white p-1.5 inline-flex">
            <button
              onClick={() => setBillingPeriod("monthly")}
              className={`rounded-full px-5 py-1.5 text-sm font-medium transition-all ${
                billingPeriod === "monthly"
                  ? "bg-slate-100 text-slate-900"
                  : "text-slate-700 hover:text-slate-900"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingPeriod("yearly")}
              className={`rounded-full px-5 py-1.5 text-sm font-medium transition-all ${
                billingPeriod === "yearly"
                  ? "bg-slate-100 text-slate-900"
                  : "text-slate-700 hover:text-slate-900"
              }`}
            >
              Yearly
            </button>
          </div>

          {/* Savings Badge */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-teal-600 flex items-center gap-1">
              ↙ Save 40% with Yearly Billing
            </span>
            <span className="inline-block rounded-full bg-teal-100 px-3 py-1 text-xs font-bold text-teal-600">
              BEST VALUE
            </span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-2xl px-6 py-7 transition-all ${
                plan.isPopular
                  ? "border-2 border-orange-300 bg-orange-50 shadow-lg"
                  : "border border-slate-200 bg-white"
              }`}
            >
              {/* Badge */}
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 transform">
                  <span className="inline-block rounded-full bg-amber-700 px-4 py-1 text-xs font-bold text-white">
                    {plan.badge}
                  </span>
                </div>
              )}

              {/* Plan Header */}
              <div className={`${plan.isPopular ? "pt-1" : ""}`}>
                <h3 className="text-xl font-bold text-slate-900">
                  {plan.name}
                </h3>
                <p className="mt-1 text-sm text-teal-600">
                  {plan.description}
                </p>
              </div>

              {/* Price */}
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-bold text-slate-900">
                  ${plan.price}
                </span>
                <span className="text-sm text-orange-700 font-medium">{plan.period}</span>
              </div>

              {/* Features List */}
              <div className="mt-6 space-y-3">
                {plan.features.map((feature, featureIndex) => (
                  <div
                    key={featureIndex}
                    className="flex items-start gap-2.5"
                  >
                    {feature.included ? (
                      <div className="flex-shrink-0 mt-0.5 flex items-center justify-center h-5 w-5 rounded-full border-2 border-teal-500 bg-teal-50">
                        <Check className="h-3 w-3 text-teal-600 font-bold" />
                      </div>
                    ) : (
                      <div className="flex-shrink-0 mt-0.5 flex items-center justify-center h-5 w-5 rounded-full border-2 border-slate-300 relative">
                        <div className="h-1 w-3 bg-slate-300 absolute"></div>
                      </div>
                    )}
                    <span
                      className={`text-sm ${
                        feature.included
                          ? "text-slate-700"
                          : "text-slate-400 line-through"
                      }`}
                    >
                      {feature.name}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <Link
                href={plan.buttonHref}
                className={`mt-7 block w-full rounded-2xl px-6 py-3 text-center font-semibold text-sm transition-all ${
                  plan.isPopular
                    ? "bg-amber-700 text-white hover:bg-amber-800"
                    : "border-2 border-amber-700 text-amber-700 hover:bg-amber-50"
                }`}
              >
                {plan.buttonText}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
