'use client';
import React from 'react';

const TermsAndConditions = () => {
  return (
    <div className="max-w-3xl mx-auto px-6 py-8 bg-white text-black">
      <h1 className="text-4xl font-bold text-center mb-8">Terms and Conditions</h1>
      <p className="text-center text-sm mb-4">Last updated: May 06, 2025</p>
      <p className="text-lg mb-6">
        Please read these terms and conditions carefully before using Our Service.
      </p>

      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Interpretation and Definitions</h2>
        <h3 className="text-xl font-medium">Interpretation</h3>
        <p>
          The words of which the initial letter is capitalized have meanings defined under the
          following conditions. The following definitions shall have the same meaning regardless of
          whether they appear in singular or in plural.
        </p>

        <h3 className="text-xl font-medium mt-4">Definitions</h3>
        <p className="mb-4">
          For the purposes of these Terms and Conditions:
        </p>
        <ul className="space-y-2 list-disc pl-5">
          <li>
            <strong>Affiliate</strong> means an entity that controls, is controlled by or is under
            common control with a party, where "control" means ownership of 50% or more of the
            shares, equity interest or other securities entitled to vote for election of directors
            or other managing authority.
          </li>
          <li><strong>Country</strong> refers to: French Southern Territories</li>
          <li><strong>Company</strong> refers to immovision.</li>
          <li><strong>Device</strong> means any device that can access the Service such as a computer, a cellphone or a digital tablet.</li>
          <li><strong>Service</strong> refers to the Website.</li>
          <li><strong>Terms and Conditions</strong> mean these Terms and Conditions that form the entire agreement between You and the Company.</li>
          <li><strong>Third-party Social Media Service</strong> means any services or content provided by a third-party that may be displayed, included or made available by the Service.</li>
          <li>
            <strong>Website</strong> refers to immovision, accessible from{" "}
            <a href="https://immovision.com" target="_blank" className="text-blue-600 hover:underline">
              immovision.com
            </a>
          </li>
          <li><strong>You</strong> means the user or the company using the Service.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">Acknowledgment</h2>
        <p>
          These are the Terms and Conditions governing the use of this Service and the agreement
          that operates between You and the Company. These Terms set out the rights and obligations
          of all users.
        </p>
        <p className="mt-4">
          Your access to and use of the Service is conditioned on Your acceptance of and compliance
          with these Terms. They apply to all visitors, users, and others who access the Service.
        </p>
        <p className="mt-4">
          By accessing or using the Service You agree to be bound by these Terms. If You disagree,
          you may not access the Service.
        </p>
        <p className="mt-4">You represent that you are over 18. The Service is not for minors.</p>
        <p className="mt-4">
          Use of the Service is also conditioned on acceptance of the Privacy Policy. Please review
          it carefully before use.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Links to Other Websites</h2>
        <p>
          Our Service may contain links to third-party websites not owned by the Company. We have no
          control over and assume no responsibility for their content, privacy policies, or
          practices.
        </p>
        <p className="mt-4">
          You agree that the Company is not liable for any damage or loss caused by your use of such
          websites.
        </p>
        <p className="mt-4">Please review the terms and privacy policies of any third-party websites you visit.</p>

        <h2 className="text-2xl font-semibold mt-8">Termination</h2>
        <p>
          We may terminate or suspend access to the Service immediately, without notice, if You
          breach these Terms.
        </p>
        <p className="mt-4">Upon termination, your right to use the Service will cease.</p>

        <h2 className="text-2xl font-semibold mt-8">Limitation of Liability</h2>
        <p>
          The Company's total liability will not exceed the amount paid by You through the Service
          or 100 USD if no purchase was made.
        </p>
        <p className="mt-4">
          In no event shall the Company or its suppliers be liable for any indirect or consequential
          damages, including but not limited to loss of data, profits, or privacy.
        </p>

        <h2 className="text-2xl font-semibold mt-8">"AS IS" and "AS AVAILABLE" Disclaimer</h2>
        <p>
          The Service is provided "AS IS" and "AS AVAILABLE" without warranty of any kind. Use at
          your own risk.
        </p>
      </div>
    </div>
  );
};

export default TermsAndConditions;
