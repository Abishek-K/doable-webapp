import type { Metadata } from 'next';
import React from 'react';
import { PolicyLayout } from '@/app/(policy)/components/PolicyLayout';

export const metadata: Metadata = {
  title: "Privacy Policy — Doable",
  description:
    "Read Doable's Privacy Policy to understand how we collect, use, and protect your personal information.",
  robots: { index: true, follow: false },
};
import { PolicySection } from '@/app/(policy)/components/PolicySection';
import { PolicyHeading } from '@/app/(policy)/components/PolicyHeading';
import { PolicyText } from '@/app/(policy)/components/PolicyText';
import { PolicyList } from '@/app/(policy)/components/PolicyList';

const PrivacyPage = () => {
  return (
    <PolicyLayout>
      <PolicySection>
        <PolicyHeading level={1}>Privacy Policy</PolicyHeading>
        <PolicyText className="text-sm text-gray-500">Last updated: January 1, 2024</PolicyText>
      </PolicySection>

      <PolicySection>
        <PolicyHeading level={2}>1. Information We Collect</PolicyHeading>
        <PolicyText>
          We collect information to provide and improve our services. The types of information we collect depend on how you use our services.
        </PolicyText>
        <PolicyList 
          items={[
            "Personal information you provide (e.g., name, email, password).",
            "Usage data collected automatically (e.g., IP address, browser type).",
            "Cookies and similar tracking technologies.",
          ]}
        />
      </PolicySection>

      <PolicySection>
        <PolicyHeading level={2}>2. How We Use Your Information</PolicyHeading>
        <PolicyText>
          We use the information we collect for various purposes, including to provide, maintain, and improve our services, and to protect Doable and our users.
        </PolicyText>
      </PolicySection>

      <PolicySection>
        <PolicyHeading level={2}>3. Information Sharing</PolicyHeading>
        <PolicyText>
          We do not share your personal information with third parties except as described in this policy or with your consent.
        </PolicyText>
      </PolicySection>

    </PolicyLayout>
  );
};

export default PrivacyPage;
