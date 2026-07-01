import type { Metadata } from 'next';
import React from 'react';
import { PolicyLayout } from '@/app/(policy)/components/PolicyLayout';
import { PolicySection } from '@/app/(policy)/components/PolicySection';
import { PolicyHeading } from '@/app/(policy)/components/PolicyHeading';
import { PolicyText } from '@/app/(policy)/components/PolicyText';

export const metadata: Metadata = {
  title: "Legal Notice — Doable",
  description: "Legal information and provider details for the Doable platform.",
  robots: { index: true, follow: false },
};

export default function LegalNoticePage() {
  return (
    <PolicyLayout title="Legal Notice" subtitle="Company information and legal disclosures.">
      <PolicySection>
        <PolicyHeading level={2}>1. Provider Information</PolicyHeading>
        <PolicyText>
          This platform (Doable) is provided and operated by:<br /><br />
          <strong>Hustleminds</strong><br />
          Email: hustlemindsco@gmail.com
        </PolicyText>
      </PolicySection>

      <PolicySection>
        <PolicyHeading level={2}>2. Content Disclaimer</PolicyHeading>
        <PolicyText>
          The content provided on Doable consists of educational summaries of non-fiction books. These summaries are generated using a combination of artificial intelligence (AI) and human editorial intervention to ensure accuracy and high quality. The summaries are intended to highlight key insights and are not a replacement for reading the original works.
        </PolicyText>
      </PolicySection>

      <PolicySection>
        <PolicyHeading level={2}>3. Copyright & Intellectual Property</PolicyHeading>
        <PolicyText>
          All proprietary content, branding, and structural frameworks on Doable are the intellectual property of Hustleminds. The original concepts, theories, and quotes referenced in our summaries remain the intellectual property of their respective authors and publishers. Doable operates under the principles of fair use to provide transformative, educational content.
        </PolicyText>
      </PolicySection>

      <PolicySection>
        <PolicyHeading level={2}>4. Liability for Links</PolicyHeading>
        <PolicyText>
          Our platform may contain links to external third-party websites. We have no influence on the content of those websites and cannot accept any liability for them. The respective provider or operator of the linked sites is always responsible for their content.
        </PolicyText>
      </PolicySection>
    </PolicyLayout>
  );
}
