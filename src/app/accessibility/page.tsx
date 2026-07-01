import type { Metadata } from 'next';
import React from 'react';
import { PolicyLayout } from '@/app/(policy)/components/PolicyLayout';
import { PolicySection } from '@/app/(policy)/components/PolicySection';
import { PolicyHeading } from '@/app/(policy)/components/PolicyHeading';
import { PolicyText } from '@/app/(policy)/components/PolicyText';

export const metadata: Metadata = {
  title: "Accessibility Statement — Doable",
  description: "Doable's commitment to digital accessibility for all users.",
  robots: { index: true, follow: false },
};

export default function AccessibilityPage() {
  return (
    <PolicyLayout title="Accessibility Statement" subtitle="Our commitment to inclusive learning.">
      <PolicySection>
        <PolicyHeading level={2}>1. Our Commitment</PolicyHeading>
        <PolicyText>
          At Doable, we believe that education and self-improvement should be accessible to everyone. We are committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone and applying the relevant accessibility standards to our web application and audio content.
        </PolicyText>
      </PolicySection>

      <PolicySection>
        <PolicyHeading level={2}>2. Accessibility Standards</PolicyHeading>
        <PolicyText>
          We strive to conform to the Web Content Accessibility Guidelines (WCAG) 2.1, Level AA. These guidelines explain how to make web content more accessible for people with disabilities and more user-friendly for everyone. Our ongoing efforts include:
        </PolicyText>
        <ul className="list-disc pl-5 mt-4 space-y-2 text-gray-700">
          <li>Ensuring text has sufficient color contrast.</li>
          <li>Providing clear structure and semantic HTML for screen readers.</li>
          <li>Ensuring our platform is navigable using a keyboard.</li>
          <li>Providing audio versions of our summaries for users with visual impairments or learning disabilities.</li>
        </ul>
      </PolicySection>

      <PolicySection>
        <PolicyHeading level={2}>3. Continuous Improvement</PolicyHeading>
        <PolicyText>
          Accessibility is an ongoing effort. While we strive to make Doable as accessible as possible, some areas of the platform may still be in development or rely on third-party components that we do not fully control. We are actively working to identify and resolve any accessibility barriers.
        </PolicyText>
      </PolicySection>

      <PolicySection>
        <PolicyHeading level={2}>4. Feedback and Contact</PolicyHeading>
        <PolicyText>
          We welcome your feedback on the accessibility of Doable. If you encounter any accessibility barriers while using our platform, please let us know so we can assist you and improve our service.
          <br /><br />
          Please contact us at: <strong>hustlemindsco@gmail.com</strong>
        </PolicyText>
      </PolicySection>
    </PolicyLayout>
  );
}
