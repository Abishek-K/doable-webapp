import type { Metadata } from 'next';
import React from 'react';
import { PolicyLayout } from '@/app/(policy)/components/PolicyLayout';

export const metadata: Metadata = {
  title: "Cookie Policy — Doable",
  description:
    "Learn how Doable uses cookies to improve your experience and how you can manage your cookie preferences.",
  robots: { index: true, follow: false },
};
import { PolicySection } from '@/app/(policy)/components/PolicySection';
import { PolicyHeading } from '@/app/(policy)/components/PolicyHeading';
import { PolicyText } from '@/app/(policy)/components/PolicyText';
import { PolicyList } from '@/app/(policy)/components/PolicyList';

const CookiePolicyPage = () => {
  return (
    <PolicyLayout>
      <PolicySection>
        <PolicyHeading level={1}>Cookie Policy</PolicyHeading>
        <PolicyText className="text-sm text-gray-500">Last updated: January 1, 2024</PolicyText>
      </PolicySection>

      <PolicySection>
        <PolicyHeading level={2}>1. What Are Cookies?</PolicyHeading>
        <PolicyText>
          Cookies are small text files stored on your device when you visit a website. They are used to remember your preferences and improve your user experience.
        </PolicyText>
      </PolicySection>

      <PolicySection>
        <PolicyHeading level={2}>2. How We Use Cookies</PolicyHeading>
        <PolicyText>
          We use cookies for several purposes, including:
        </PolicyText>
        <PolicyList 
          items={[
            "To provide and operate the service.",
            "To understand and save your preferences for future visits.",
            "To compile aggregate data about site traffic and interactions."
          ]}
        />
      </PolicySection>

      <PolicySection>
        <PolicyHeading level={2}>3. Your Choices</PolicyHeading>
        <PolicyText>
          You can choose to disable cookies through your browser settings. However, this may affect your ability to use certain features of the service.
        </PolicyText>
      </PolicySection>

    </PolicyLayout>
  );
};

export default CookiePolicyPage;
