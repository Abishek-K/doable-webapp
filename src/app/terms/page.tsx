import type { Metadata } from 'next';
import { CheckCircleIcon, ShieldCheckIcon, FileTextIcon, MailIcon } from 'lucide-react';

export const metadata: Metadata = {
  title: "Terms of Service — Doable",
  description:
    "Read Doable's Terms of Service to understand the rules and guidelines for using our platform.",
  robots: { index: true, follow: false },
};

const LegalPage = () => {
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      {/* Header Section */}
      <div className="text-center">
        <p className="inline-flex items-center rounded-full bg-orange-100 px-4 py-1 text-sm font-semibold text-orange-800 tracking-wide">
          LEGAL DOCUMENTATION
        </p>
        <h1 className="mt-6 text-4xl sm:text-5xl font-bold tracking-tight text-gray-900">
          Trust & Transparency.
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
          We believe in keeping things clear and doable. Here is everything you need to know about how we handle your data and our mutual commitments.
        </p>
      </div>

      {/* Policy Links */}
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
        <div className="bg-gray-50/80 rounded-2xl p-6 flex items-center justify-between transition hover:bg-gray-100/70">
          <div>
            <h2 className="font-semibold text-gray-900 flex items-center">
              <ShieldCheckIcon className="w-5 h-5 mr-2 text-gray-400" />
              Privacy Policy
            </h2>
            <p className="text-sm text-gray-500 mt-1">Last updated October 24, 2023</p>
          </div>
          <div className="text-gray-300 opacity-60">
            <ShieldCheckIcon className="w-16 h-16" strokeWidth={1} />
          </div>
        </div>
        <div className="bg-gray-50/80 rounded-2xl p-6 flex items-center justify-between transition hover:bg-gray-100/70">
          <div>
            <h2 className="font-semibold text-gray-900 flex items-center">
              <FileTextIcon className="w-5 h-5 mr-2 text-gray-400" />
              Terms of Service
            </h2>
            <p className="text-sm text-gray-500 mt-1">Last updated October 24, 2023</p>
          </div>
          <div className="text-gray-300 opacity-60">
              <FileTextIcon className="w-16 h-16" strokeWidth={1} />
          </div>
        </div>
      </div>

      {/* Privacy Policy Section */}
      <div id="privacy-policy" className="mt-20 sm:mt-24">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">Privacy Policy</h2>
        
        <div className="mt-8 space-y-8">
          <div>
            <h3 className="text-xl font-semibold text-gray-900">1. Information We Collect</h3>
            <p className="mt-3 text-base text-gray-700 leading-relaxed">
              At Doable, your privacy is a priority. We collect information that you provide directly to us when you create an account, such as your name, email address, and learning preferences. We also collect technical data including your IP address and device information to improve our platform's performance.
            </p>
            <div className="mt-4 bg-blue-50/70 border-l-4 border-blue-300 p-4 rounded-r-lg">
              <p className="text-sm text-blue-800">
                <span className="font-semibold">Key Takeaway:</span> We only collect what is necessary to give you a personalized learning experience.
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-900">2. How We Use Your Data</h3>
            <ul className="mt-3 space-y-2 text-base text-gray-700">
              <li className="flex items-start">
                <CheckCircleIcon className="w-5 h-5 mr-3 mt-1 text-blue-500 flex-shrink-0" />
                <span>To provide, maintain, and improve our learning services.</span>
              </li>
              <li className="flex items-start">
                <CheckCircleIcon className="w-5 h-5 mr-3 mt-1 text-blue-500 flex-shrink-0" />
                <span>To communicate with you about product updates and support.</span>
              </li>
              <li className="flex items-start">
                <CheckCircleIcon className="w-5 h-5 mr-3 mt-1 text-blue-500 flex-shrink-0" />
                <span>To personalize your curriculum based on progress metrics.</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-900">3. Data Security</h3>
            <p className="mt-3 text-base text-gray-700 leading-relaxed">
              We implement a variety of security measures to maintain the safety of your personal information. Your data is encrypted at rest and in transit. We use industry-standard protocols to ensure that your learning journey remains private and secure.
            </p>
          </div>
        </div>
      </div>

      {/* Terms of Service Section */}
      <div id="terms-of-service" className="mt-20 sm:mt-24">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">Terms of Service</h2>

        <div className="mt-8 space-y-8">
          <div>
            <h3 className="text-xl font-semibold text-gray-900">1. Acceptance of Terms</h3>
            <p className="mt-3 text-base text-gray-700 leading-relaxed">
              By accessing or using Doable, you agree to be bound by these Terms of Service. If you do not agree to all of the terms and conditions, you may not access the platform. These terms apply to all visitors, users, and others who access the service.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-900">2. User Conduct</h3>
            <p className="mt-3 text-base text-gray-700 leading-relaxed">
              We strive to maintain a respectful and productive learning environment. Users agree not to:
            </p>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-gray-50/80 rounded-xl p-6">
                <h4 className="font-semibold text-gray-800">No Misuse</h4>
                <p className="text-sm text-gray-600 mt-1">Attempt to gain unauthorized access to our systems or user accounts.</p>
              </div>
              <div className="bg-gray-50/80 rounded-xl p-6">
                <h4 className="font-semibold text-gray-800">Respect IP</h4>
                <p className="text-sm text-gray-600 mt-1">Copy, distribute, or create derivative works from our curriculum without consent.</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-900">3. Subscription & Payments</h3>
            <p className="mt-3 text-base text-gray-700 leading-relaxed">
              Some parts of the Service are billed on a subscription basis. You will be billed in advance on a recurring and periodic basis. Subscription cycles are set either on a monthly or annual basis, depending on the plan you select when purchasing a Subscription.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-900">4. Limitation of Liability</h3>
            <p className="mt-3 text-base text-gray-700 leading-relaxed">
              In no event shall Doable, nor its directors, employees, or partners, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
            </p>
          </div>
        </div>
      </div>

      {/* Contact CTA */}
      <div className="mt-20 sm:mt-24 bg-orange-50/70 rounded-2xl p-8 sm:p-12 text-center">
          <MailIcon className="w-8 h-8 mx-auto text-orange-600" />
          <h2 className="mt-4 text-2xl font-bold text-gray-900">
              Still have questions?
          </h2>
          <p className="mt-2 text-base text-gray-700 max-w-md mx-auto">
              Our legal and support teams are here to help you understand how Doable works for you.
          </p>
          <a
              href="mailto:legal@doable.com"
              className="mt-6 inline-flex items-center justify-center rounded-lg bg-orange-900 px-6 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-orange-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-900"
          >
              Email Legal Team
          </a>
      </div>

    </main>
  );
};

export default LegalPage;
