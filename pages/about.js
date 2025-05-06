import React from 'react';
import Layout from '../components/layout/Layout';

export default function AboutPage() {
  return (
    <Layout
      title="About NewsFlow - Our Mission and Values"
      description="Learn more about NewsFlow, our mission to deliver timely and accurate news from around the world."
    >
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h1 className="text-3xl font-bold mb-6">About NewsFlow</h1>
        
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">Our Mission</h2>
          <p className="text-gray-700 mb-4">
            NewsFlow is dedicated to providing timely, accurate, and relevant news from around the world. 
            We believe in the power of information and its ability to empower individuals to make informed decisions.
          </p>
          <p className="text-gray-700">
            Our platform aggregates news from various trusted sources, ensuring you get a comprehensive view of current events 
            without having to visit multiple websites.
          </p>
        </section>
        
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">How It Works</h2>
          <p className="text-gray-700 mb-4">
            NewsFlow uses advanced technology to collect and categorize news from reputable sources. 
            Our system updates hourly, ensuring you always have access to the latest information.
          </p>
          <p className="text-gray-700">
            We organize news by categories such as India, World, Technology, Business, and more, 
            making it easy for you to find the information that matters most to you.
          </p>
        </section>
        
        <section>
          <h2 className="text-xl font-semibold mb-3">Our Values</h2>
          <ul className="list-disc pl-5 text-gray-700 space-y-2">
            <li><strong>Accuracy:</strong> We prioritize factual reporting and verify information before publishing.</li>
            <li><strong>Timeliness:</strong> We understand the importance of receiving news as it happens.</li>
            <li><strong>Accessibility:</strong> We believe news should be easily accessible to everyone.</li>
            <li><strong>Diversity:</strong> We present news from various perspectives to provide a complete picture.</li>
          </ul>
        </section>
      </div>
    </Layout>
  );
}