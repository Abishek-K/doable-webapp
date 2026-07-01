import type { Metadata } from 'next';
import React from 'react';
import { PolicyLayout } from '@/app/(policy)/components/PolicyLayout';
import { PolicySection } from '@/app/(policy)/components/PolicySection';
import { PolicyHeading } from '@/app/(policy)/components/PolicyHeading';
import { PolicyText } from '@/app/(policy)/components/PolicyText';
import { PolicyList } from '@/app/(policy)/components/PolicyList';

export const metadata: Metadata = {
  title: "Cookie Policy — Doable",
  description: "Learn how Doable uses cookies to improve your experience.",
  robots: { index: true, follow: false },
};

export default function CookiePolicyPage() {
  return (
    <PolicyLayout title="Cookie Policy" subtitle="Understanding how we use cookies and tracking technologies.">
      <PolicySection>
        <PolicyText className="text-sm text-gray-500 font-medium">Last updated: July 1, 2026</PolicyText>
      </PolicySection>

      <PolicySection>
        <PolicyHeading level={2}>1. What Are Cookies?</PolicyHeading>
        <PolicyText>
          Cookies are small text files stored on your device when you visit a website. They are widely used to make websites work more efficiently and to provide information to the owners of the site.
        </PolicyText>
      </PolicySection>

      <PolicySection>
        <PolicyHeading level={2}>2. How We Use Cookies</PolicyHeading>
        <PolicyText>
          We use cookies and similar tracking technologies to track the activity on our Service and hold certain information. The cookies we use fall into the following categories:
        </PolicyText>
        <PolicyList items={[
          "Essential Cookies: Required for the operation of the Service, such as enabling you to log into secure areas.",
          "Preference Cookies: Allow us to remember choices you make (like your language or region).",
          "Analytics Cookies: Help us understand how visitors interact with our platform by reporting information anonymously.",
          "Marketing Cookies: Used to deliver relevant advertisements and track ad campaign performance."
        ]} />
      </PolicySection>

      <PolicySection>
        <PolicyHeading level={2}>3. Managing Cookies</PolicyHeading>
        <PolicyText>
          You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service properly.
        </PolicyText>
      </PolicySection>

      <PolicySection>
        <PolicyHeading level={2}>4. Contact Us</PolicyHeading>
        <PolicyText>
          For more information about our use of cookies, please contact us at: <strong>hustlemindsco@gmail.com</strong>.
        </PolicyText>
      </PolicySection>
    </PolicyLayout>
  );
}
