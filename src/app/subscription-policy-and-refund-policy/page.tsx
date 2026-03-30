import type { Metadata } from 'next';
import React from 'react';
import { PolicyLayout } from '@/app/(policy)/components/PolicyLayout';

export const metadata: Metadata = {
  title: "Subscription & Refund Policy — Doable",
  description:
    "Read Doable's Subscription and Refund Policy. Understand your billing cycle, cancellation options, and how to request a refund.",
  robots: { index: true, follow: false },
};
import { PolicySection } from '@/app/(policy)/components/PolicySection';
import { PolicyHeading } from '@/app/(policy)/components/PolicyHeading';
import { PolicyText } from '@/app/(policy)/components/PolicyText';

const SubscriptionPolicyPage = () => {
  return (
    <PolicyLayout>
      <PolicySection>
        <PolicyHeading level={1}>Subscription & Refund Policy</PolicyHeading>
        <PolicyText className="text-sm text-gray-500">Last updated: January 1, 2024</PolicyText>
      </PolicySection>

      <PolicySection>
        <PolicyHeading level={2}>1. Subscription Terms</PolicyHeading>
        <PolicyText>
          Your subscription begins as soon as your initial payment is processed. You will be charged automatically on a recurring basis (monthly or annually) until you cancel.
        </PolicyText>
      </PolicySection>

      <PolicySection>
        <PolicyHeading level={2}>2. Cancellation Policy</PolicyHeading>
        <PolicyText>
          You can cancel your subscription at any time from your account settings. The cancellation will take effect at the end of your current billing cycle.
        </PolicyText>
      </PolicySection>
      
      <PolicySection>
        <PolicyHeading level={2}>3. Refund Policy</PolicyHeading>
        <PolicyText>
          We offer a 30-day money-back guarantee for new subscriptions. If you are not satisfied, you can request a full refund within 30 days of your initial purchase.
        </PolicyText>
      </PolicySection>

    </PolicyLayout>
  );
};

export default SubscriptionPolicyPage;
