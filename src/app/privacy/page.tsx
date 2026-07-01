import type { Metadata } from 'next';
import React from 'react';
import { PolicyLayout } from '@/app/(policy)/components/PolicyLayout';
import { PolicySection } from '@/app/(policy)/components/PolicySection';
import { PolicyHeading } from '@/app/(policy)/components/PolicyHeading';
import { PolicyText } from '@/app/(policy)/components/PolicyText';
import { PolicyList } from '@/app/(policy)/components/PolicyList';

export const metadata: Metadata = {
  title: "Privacy Policy — Doable",
  description: "Read Doable's Privacy Policy to understand how we collect, use, and protect your personal information.",
  robots: { index: true, follow: false },
};

export default function PrivacyPage() {
  return (
    <PolicyLayout title="Privacy Policy" subtitle="How we collect, use, and safeguard your data.">
      <PolicySection>
        <PolicyText className="text-sm text-gray-500 font-medium">Last updated: July 1, 2026</PolicyText>
      </PolicySection>

      <PolicySection>
        <PolicyHeading level={2}>1. Information We Collect</PolicyHeading>
        <PolicyText>
          We collect various types of information in connection with the services we provide:
        </PolicyText>
        <PolicyList items={[
          "Personal Data: Information that can identify you, such as your email address, name, and payment details when you subscribe.",
          "Usage Data: Information on how you interact with our platform, such as the summaries you read, time spent, and your learning progress.",
          "Device Data: IP address, browser type, operating system, and device identifiers."
        ]} />
      </PolicySection>

      <PolicySection>
        <PolicyHeading level={2}>2. How We Use Your Information</PolicyHeading>
        <PolicyText>
          We use the collected data for the following purposes:
        </PolicyText>
        <PolicyList items={[
          "To provide and maintain the Doable service.",
          "To personalize your learning experience and recommend relevant book summaries.",
          "To process payments and manage your subscription.",
          "To communicate with you, including sending newsletters and service updates.",
          "To monitor usage and improve our AI-assisted editorial processes."
        ]} />
      </PolicySection>

      <PolicySection>
        <PolicyHeading level={2}>3. Information Sharing</PolicyHeading>
        <PolicyText>
          We do not sell your personal data. We may share your information only with:
        </PolicyText>
        <PolicyList items={[
          "Service Providers: Third-party vendors (like payment processors and analytics providers) who assist us in operating the Service.",
          "Legal Obligations: When required by law or to respond to valid requests by public authorities.",
          "Business Transfers: In connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition."
        ]} />
      </PolicySection>

      <PolicySection>
        <PolicyHeading level={2}>4. Data Security</PolicyHeading>
        <PolicyText>
          The security of your data is important to us. We strive to use commercially acceptable means to protect your Personal Data, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure.
        </PolicyText>
      </PolicySection>

      <PolicySection>
        <PolicyHeading level={2}>5. Your Privacy Rights</PolicyHeading>
        <PolicyText>
          Depending on your location, you may have the right to access, update, or delete the information we have on you. If you wish to exercise these rights or want to know what Personal Data we hold about you, please contact us.
        </PolicyText>
      </PolicySection>

      <PolicySection>
        <PolicyHeading level={2}>6. Contact Us</PolicyHeading>
        <PolicyText>
          If you have any questions about this Privacy Policy, please contact us by email: <strong>hustlemindsco@gmail.com</strong>.
        </PolicyText>
      </PolicySection>
    </PolicyLayout>
  );
}
