import React from 'react';
import Layout from '../components/layout/Layout';

export default function PrivacyPage() {
  return (
    <Layout
      title="Privacy Policy - NewsFlow"
      description="Our privacy policy outlines how we collect, use, and protect your information when you use NewsFlow."
    >
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
        
        <section className="mb-8">
          <p className="text-gray-700 mb-4">
            At NewsFlow, we take your privacy seriously. This Privacy Policy explains how we collect, use, and protect your information when you use our website.
          </p>
          <p className="text-gray-700">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </section>
        
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">Information We Collect</h2>
          <p className="text-gray-700 mb-4">
            We collect minimal information to provide and improve our services. This may include:
          </p>
          <ul className="list-disc pl-5 text-gray-700 space-y-2 mb-4">
            <li><strong>Usage Data:</strong> Information on how you access and use our website.</li>
            <li><strong>Device Information:</strong> Browser type, device type, and operating system.</li>
            <li><strong>Cookies:</strong> Small files stored on your device to enhance your browsing experience.</li>
          </ul>
        </section>
        
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">How We Use Your Information</h2>
          <p className="text-gray-700 mb-4">
            We use the collected information to:
          </p>
          <ul className="list-disc pl-5 text-gray-700 space-y-2">
            <li>Provide and maintain our service</li>
            <li>Improve and personalize your experience</li>
            <li>Analyze usage patterns to enhance our website</li>
            <li>Display relevant advertisements</li>
          </ul>
        </section>
        
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">Third-Party Services</h2>
          <p className="text-gray-700">
            We may use third-party services such as Google Analytics and Google AdSense. These services may collect information about your use of our website. Please refer to their respective privacy policies for more information.
          </p>
        </section>
        
        <section>
          <h2 className="text-xl font-semibold mb-3">Contact Us</h2>
          <p className="text-gray-700">
            If you have any questions about our Privacy Policy, please contact us through our Contact page.
          </p>
        </section>
      </div>
    </Layout>
  );
}