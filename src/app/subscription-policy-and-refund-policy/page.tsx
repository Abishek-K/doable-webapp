import type { Metadata } from 'next';
import React from 'react';
import { PolicyLayout } from '@/app/(policy)/components/PolicyLayout';
import { PolicySection } from '@/app/(policy)/components/PolicySection';
import { PolicyHeading } from '@/app/(policy)/components/PolicyHeading';
import { PolicyText } from '@/app/(policy)/components/PolicyText';

export const metadata: Metadata = {
  title: "Subscription & Refund Policy — Doable",
  description: "Read Doable's Subscription and Refund Policy. Understand your billing cycle, cancellation options, and refunds.",
  robots: { index: true, follow: false },
};

export default function SubscriptionPolicyPage() {
  return (
    <PolicyLayout title="Subscription & Refund Policy" subtitle="Everything you need to know about billing, cancellations, and refunds.">
      <PolicySection>
        <PolicyText className="text-sm text-gray-500 font-medium">Last updated: July 1, 2026</PolicyText>
      </PolicySection>

      <PolicySection>
        <PolicyHeading level={2}>1. Free Trials</PolicyHeading>
        <PolicyText>
          Doable may offer a free trial period for new users. Unless you cancel before the end of the free trial, you will be automatically charged the applicable subscription fee for the plan you selected during signup. We will notify you before the trial ends if required by applicable law.
        </PolicyText>
      </PolicySection>

      <PolicySection>
        <PolicyHeading level={2}>2. Subscription Terms</PolicyHeading>
        <PolicyText>
          By starting a premium subscription, you agree to recurring billing (monthly or annually, depending on your plan). Your subscription will automatically renew at the end of each billing cycle unless you cancel it.
        </PolicyText>
      </PolicySection>

      <PolicySection>
        <PolicyHeading level={2}>3. Cancellation Policy</PolicyHeading>
        <PolicyText>
          You may cancel your subscription renewal at any time through your account settings. Upon cancellation, you will continue to have access to Doable Premium features until the end of your current paid billing period. We do not provide prorated refunds for mid-cycle cancellations.
        </PolicyText>
      </PolicySection>
      
      <PolicySection>
        <PolicyHeading level={2}>4. Refund Policy</PolicyHeading>
        <PolicyText>
          Due to the digital nature of Doable's content, purchases are generally non-refundable. However, we offer a 14-day money-back guarantee for initial purchases if you have not heavily utilized the service and are unsatisfied. Subsequent renewals are not eligible for refunds. To request a refund, please contact our support team.
        </PolicyText>
      </PolicySection>

      <PolicySection>
        <PolicyHeading level={2}>5. Price Changes</PolicyHeading>
        <PolicyText>
          We reserve the right to adjust pricing for our subscriptions. Any price changes will be communicated to you in advance and will only apply to future billing cycles.
        </PolicyText>
      </PolicySection>

      <PolicySection>
        <PolicyHeading level={2}>6. Contact Support</PolicyHeading>
        <PolicyText>
          For billing inquiries or refund requests, please email us at: <strong>hustlemindsco@gmail.com</strong>.
        </PolicyText>
      </PolicySection>
    </PolicyLayout>
  );
}
