// pages/terms-and-conditions.tsx
import React from 'react';

const TermsAndConditions = () => {
  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">Terms and Conditions</h1>
      <p className="text-center text-sm text-gray-600 mb-4">Last updated: May 06, 2025</p>
      <p className="text-lg text-gray-800 mb-6">Please read these terms and conditions carefully before using Our Service.</p>

      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-900">Interpretation and Definitions</h2>
        <h3 className="text-xl font-medium text-gray-800">Interpretation</h3>
        <p className="text-gray-700">
          The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.
        </p>

        <h3 className="text-xl font-medium text-gray-800 mt-4">Definitions</h3>
        <p className="text-gray-700 mb-4">For the purposes of these Terms and Conditions:</p>
        <ul className="space-y-2 text-gray-700 list-disc pl-5">
          <li>
            <strong>Affiliate</strong> means an entity that controls, is controlled by or is under common control with a party, where "control" means ownership of 50% or more of the shares, equity interest or other securities entitled to vote for election of directors or other managing authority.
          </li>
          <li>
            <strong>Country</strong> refers to: French Southern Territories
          </li>
          <li>
            <strong>Company</strong> (referred to as either "the Company", "We", "Us" or "Our" in this Agreement) refers to immovision.
          </li>
          <li>
            <strong>Device</strong> means any device that can access the Service such as a computer, a cellphone or a digital tablet.
          </li>
          <li>
            <strong>Service</strong> refers to the Website.
          </li>
          <li>
            <strong>Terms and Conditions</strong> (also referred to as "Terms") mean these Terms and Conditions that form the entire agreement between You and the Company regarding the use of the Service.
          </li>
          <li>
            <strong>Third-party Social Media Service</strong> means any services or content (including data, information, products or services) provided by a third-party that may be displayed, included or made available by the Service.
          </li>
          <li>
            <strong>Website</strong> refers to immovision, accessible from <a href="https://immovision.com" target="_blank" className="text-blue-500 hover:underline">immovision.com</a>
          </li>
          <li>
            <strong>You</strong> means the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-900 mt-8">Acknowledgment</h2>
        <p className="text-gray-700">
          These are the Terms and Conditions governing the use of this Service and the agreement that operates between You and the Company. These Terms and Conditions set out the rights and obligations of all users regarding the use of the Service.
        </p>
        <p className="text-gray-700 mt-4">Your access to and use of the Service is conditioned on Your acceptance of and compliance with these Terms and Conditions. These Terms and Conditions apply to all visitors, users, and others who access or use the Service.</p>
        <p className="text-gray-700 mt-4">By accessing or using the Service You agree to be bound by these Terms and Conditions. If You disagree with any part of these Terms and Conditions, then You may not access the Service.</p>
        <p className="text-gray-700 mt-4">You represent that you are over the age of 18. The Company does not permit those under 18 to use the Service.</p>
        <p className="text-gray-700 mt-4">
          Your access to and use of the Service is also conditioned on Your acceptance of and compliance with the Privacy Policy of the Company. Our Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your personal information when You use the Application or the Website and tells You about Your privacy rights and how the law protects You.
        </p>
        <p className="text-gray-700 mt-4">Please read Our Privacy Policy carefully before using Our Service.</p>

        <h2 className="text-2xl font-semibold text-gray-900 mt-8">Links to Other Websites</h2>
        <p className="text-gray-700">
          Our Service may contain links to third-party websites or services that are not owned or controlled by the Company.
        </p>
        <p className="text-gray-700 mt-4">
          The Company has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third-party websites or services. You further acknowledge and agree that the Company shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with the use of or reliance on any such content, goods, or services available on or through any such websites or services.
        </p>
        <p className="text-gray-700 mt-4">We strongly advise You to read the terms and conditions and privacy policies of any third-party websites or services that You visit.</p>

        <h2 className="text-2xl font-semibold text-gray-900 mt-8">Termination</h2>
        <p className="text-gray-700">
          We may terminate or suspend Your access immediately, without prior notice or liability, for any reason whatsoever, including without limitation if You breach these Terms and Conditions.
        </p>
        <p className="text-gray-700 mt-4">Upon termination, Your right to use the Service will cease immediately.</p>

        <h2 className="text-2xl font-semibold text-gray-900 mt-8">Limitation of Liability</h2>
        <p className="text-gray-700">
          Notwithstanding any damages that You might incur, the entire liability of the Company and any of its suppliers under any provision of this Terms and Your exclusive remedy for all of the foregoing shall be limited to the amount actually paid by You through the Service or 100 USD if You haven't purchased anything through the Service.
        </p>
        <p className="text-gray-700 mt-4">
          To the maximum extent permitted by applicable law, in no event shall the Company or its suppliers be liable for any special, incidental, indirect, or consequential damages whatsoever (including, but not limited to, damages for loss of profits, loss of data or other information, for business interruption, for personal injury, loss of privacy arising out of or in any way related to the use of or inability to use the Service, third-party software and/or third-party hardware used with the Service, or otherwise in connection with any provision of this Terms), even if the Company or any supplier has been advised of the possibility of such damages and even if the remedy fails of its essential purpose.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 mt-8">"AS IS" and "AS AVAILABLE" Disclaimer</h2>
        <p className="text-gray-700">
          The Service is provided to You "AS IS" and "AS AVAILABLE" and with all faults and defects without warranty of any kind.
        </p>

        {/* Ajoute la suite du texte de manière similaire */}
      </div>
    </div>
  );
};

export default TermsAndConditions;
