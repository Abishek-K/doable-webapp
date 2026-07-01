import type { Metadata } from 'next';
import React from 'react';
import { PolicyLayout } from '@/app/(policy)/components/PolicyLayout';
import { PolicySection } from '@/app/(policy)/components/PolicySection';
import { PolicyHeading } from '@/app/(policy)/components/PolicyHeading';
import { PolicyText } from '@/app/(policy)/components/PolicyText';
import { PolicyList } from '@/app/(policy)/components/PolicyList';

export const metadata: Metadata = {
  title: "Terms of Service — Doable",
  description: "Read Doable's Terms of Service to understand the rules and guidelines for using our platform.",
  robots: { index: true, follow: false },
};

export default function TermsOfServicePage() {
  return (
    <PolicyLayout title="Terms of Service" subtitle="Please read these terms carefully before using Doable.">
      <PolicySection>
        <PolicyText className="text-sm text-gray-500 font-medium">Last updated: July 1, 2026</PolicyText>
      </PolicySection>

      <PolicySection>
        <PolicyHeading level={2}>1. Acceptance of Terms</PolicyHeading>
        <PolicyText>
          By accessing or using the Doable web application and services ("Service"), you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access the Service.
        </PolicyText>
      </PolicySection>

      <PolicySection>
        <PolicyHeading level={2}>2. Description of Service</PolicyHeading>
        <PolicyText>
          Doable provides concise, actionable summaries of non-fiction books and related content. 
          <strong> Note on Content Creation:</strong> Our book summaries and action plans are prepared using a combination of advanced artificial intelligence and human editorial intervention. While AI assists in analyzing and structuring the text, human editors review, refine, and validate the insights to ensure high quality, accuracy, and practical applicability.
        </PolicyText>
      </PolicySection>

      <PolicySection>
        <PolicyHeading level={2}>3. Accounts and Subscriptions</PolicyHeading>
        <PolicyList items={[
          "You must provide accurate, complete, and current information when creating an account.",
          "You are responsible for safeguarding the password and for all activities or actions under your password.",
          "Doable offers premium subscriptions. Billing, cancellation, and refund rules are outlined in our Subscription & Refund Policy."
        ]} />
      </PolicySection>

      <PolicySection>
        <PolicyHeading level={2}>4. Intellectual Property Rights</PolicyHeading>
        <PolicyText>
          The Service and its original content, features, and functionality are and will remain the exclusive property of Doable and its licensors. Our summaries are transformative educational works. We are not affiliated with, nor endorsed by, the original authors or publishers of the books summarized. You may not reproduce, distribute, or create derivative works from our content without express written permission.
        </PolicyText>
      </PolicySection>

      <PolicySection>
        <PolicyHeading level={2}>5. User Conduct</PolicyHeading>
        <PolicyText>
          You agree not to use the Service:
        </PolicyText>
        <PolicyList items={[
          "In any way that violates any applicable national or international law or regulation.",
          "For the purpose of exploiting, harming, or attempting to exploit or harm others.",
          "To copy, scrape, or systematically download our summaries for competing services or public redistribution.",
        ]} />
      </PolicySection>

      <PolicySection>
        <PolicyHeading level={2}>6. Disclaimer of Warranties</PolicyHeading>
        <PolicyText>
          The Service is provided on an "AS IS" and "AS AVAILABLE" basis. Doable makes no representations or warranties of any kind, express or implied, regarding the accuracy, adequacy, or completeness of the summaries. The content is for informational and educational purposes only and does not constitute professional advice.
        </PolicyText>
      </PolicySection>

      <PolicySection>
        <PolicyHeading level={2}>7. Limitation of Liability</PolicyHeading>
        <PolicyText>
          In no event shall Doable, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
        </PolicyText>
      </PolicySection>

      <PolicySection>
        <PolicyHeading level={2}>8. Contact Us</PolicyHeading>
        <PolicyText>
          If you have any questions about these Terms, please contact us at: <strong>hustlemindsco@gmail.com</strong>.
        </PolicyText>
      </PolicySection>
    </PolicyLayout>
  );
}
