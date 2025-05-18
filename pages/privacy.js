import React from 'react';
import Layout from '../components/layout/Layout';

export default function PrivacyPage() {
  return (
    <Layout
      title="Privacy Policy - NewsFlow"
      description="Our privacy policy outlines how we collect, use, and protect your information when you use NewsFlow."
    >
      <div className="bg-[var(--card-bg)] p-6 rounded-lg shadow-sm border border-[var(--border-color)]">
        <h1 className="text-3xl font-bold mb-6 text-[var(--text-primary)]">Privacy Policy</h1>
        
        <section className="mb-8">
          <p className="text-[var(--text-secondary)] mb-4">
            At NewsFlow, we take your privacy seriously. This Privacy Policy explains how we collect, use, and protect your information when you use our website.
          </p>
          <p className="text-[var(--text-secondary)]">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </section>
        
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3 text-[var(--text-primary)]">Information We Collect</h2>
          <p className="text-[var(--text-secondary)] mb-4">
            We collect minimal information to provide and improve our services. This may include:
          </p>
          <ul className="list-disc pl-5 text-[var(--text-secondary)] space-y-2 mb-4">
            <li><strong className="text-[var(--text-primary)]">Usage Data:</strong> Information on how you access and use our website.</li>
            <li><strong className="text-[var(--text-primary)]">Device Information:</strong> Browser type, device type, and operating system.</li>
            <li><strong className="text-[var(--text-primary)]">Cookies:</strong> Small files stored on your device to enhance your browsing experience.</li>
          </ul>
        </section>
        
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3 text-[var(--text-primary)]">How We Use Your Information</h2>
          <p className="text-[var(--text-secondary)] mb-4">
            We use the collected information to:
          </p>
          <ul className="list-disc pl-5 text-[var(--text-secondary)] space-y-2">
            <li>Provide and maintain our service</li>
            <li>Improve and personalize your experience</li>
            <li>Analyze usage patterns to enhance our website</li>
            <li>Display relevant advertisements</li>
          </ul>
        </section>
        
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3 text-[var(--text-primary)]">Third-Party Services</h2>
          <p className="text-[var(--text-secondary)]">
            We may use third-party services such as Google Analytics and Google AdSense. These services may collect information about your use of our website. Please refer to their respective privacy policies for more information.
          </p>
        </section>
        
        <section>
          <h2 className="text-xl font-semibold mb-3 text-[var(--text-primary)]">Contact Us</h2>
          <p className="text-[var(--text-secondary)]">
            If you have any questions about our Privacy Policy, please contact us through our Contact page.
          </p>
        </section>
      </div>
    </Layout>
  );
}