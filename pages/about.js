import React from 'react';
import Layout from '../components/layout/Layout';

export default function AboutPage() {
  return (
    <Layout
      title="About NewsFlow - Our Mission and Values"
      description="Learn more about NewsFlow, our mission to deliver timely and accurate news from around the world."
    >
      <div className="bg-[var(--card-bg)] p-6 rounded-lg shadow-sm border border-[var(--border-color)]">
        <h1 className="text-3xl font-bold mb-6 text-[var(--text-primary)]">About NewsFlow</h1>
        
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3 text-[var(--text-primary)]">Our Mission</h2>
          <p className="text-[var(--text-secondary)] mb-4">
            NewsFlow is dedicated to providing timely, accurate, and relevant news from around the world. 
            We believe in the power of information and its ability to empower individuals to make informed decisions.
          </p>
          <p className="text-[var(--text-secondary)]">
            Our platform aggregates news from various trusted sources, ensuring you get a comprehensive view of current events 
            without having to visit multiple websites.
          </p>
        </section>
        
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3 text-[var(--text-primary)]">How It Works</h2>
          <p className="text-[var(--text-secondary)] mb-4">
            NewsFlow uses advanced technology to collect and categorize news from reputable sources. 
            Our system updates hourly, ensuring you always have access to the latest information.
          </p>
          <p className="text-[var(--text-secondary)]">
            We organize news by categories such as India, World, Technology, Business, and more, 
            making it easy for you to find the information that matters most to you.
          </p>
        </section>
        
        <section>
          <h2 className="text-xl font-semibold mb-3 text-[var(--text-primary)]">Our Values</h2>
          <ul className="list-disc pl-5 text-[var(--text-secondary)] space-y-2">
            <li><strong className="text-[var(--text-primary)]">Accuracy:</strong> We prioritize factual reporting and verify information before publishing.</li>
            <li><strong className="text-[var(--text-primary)]">Timeliness:</strong> We understand the importance of receiving news as it happens.</li>
            <li><strong className="text-[var(--text-primary)]">Accessibility:</strong> We believe news should be easily accessible to everyone.</li>
            <li><strong className="text-[var(--text-primary)]">Diversity:</strong> We present news from various perspectives to provide a complete picture.</li>
          </ul>
        </section>
      </div>
    </Layout>
  );
}