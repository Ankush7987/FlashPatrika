import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import { getApiBaseUrl } from '../utils/api';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('');
    setMessage('');
    
    try {
      // Always use the Next.js API route which handles the dynamic API URL for us
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setStatus('success');
        setMessage('Your message has been sent successfully! We will get back to you soon.');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
        setMessage(data.message || 'Failed to send message. Please try again later.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus('error');
      setMessage('An unexpected error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <Layout
      title="Contact Us - NewsFlow"
      description="Get in touch with the NewsFlow team. We'd love to hear from you!"
    >
      <div className="bg-[var(--card-bg)] p-6 rounded-lg shadow-sm border border-[var(--border-color)]">
        <h1 className="text-3xl font-bold mb-6 text-[var(--text-primary)]">Contact Us</h1>
        
        <section className="mb-8">
          <p className="text-[var(--text-secondary)] mb-4">
            We value your feedback and are always looking to improve our service. If you have any questions, suggestions, or concerns, please don't hesitate to reach out to us.
          </p>
        </section>
        
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Get in Touch</h2>
          
          {status && (
            <div className={`p-4 mb-4 rounded-md ${status === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {message}
            </div>
          )}
          
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-[var(--text-secondary)] mb-1">Name</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-[var(--border-color)] rounded-md bg-[var(--input-bg)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Your name"
                required
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[var(--text-secondary)] mb-1">Email</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-[var(--border-color)] rounded-md bg-[var(--input-bg)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="your.email@example.com"
                required
              />
            </div>
            
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-[var(--text-secondary)] mb-1">Subject</label>
              <input 
                type="text" 
                id="subject" 
                name="subject" 
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-[var(--border-color)] rounded-md bg-[var(--input-bg)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Subject of your message"
                required
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-[var(--text-secondary)] mb-1">Message</label>
              <textarea 
                id="message" 
                name="message" 
                rows="5" 
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-[var(--border-color)] rounded-md bg-[var(--input-bg)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Your message here..."
                required
              ></textarea>
            </div>
            
            <div>
              <button 
                type="submit" 
                className="px-6 py-2 bg-primary text-white rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:bg-gray-400 disabled:cursor-not-allowed"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </div>
          </form>
        </section>
        
        <section>
          <h2 className="text-xl font-semibold mb-4">Other Ways to Connect</h2>
          <div className="space-y-3 text-[var(--text-secondary)]">
            <p>
              <strong>Email:</strong> info@newsflow.example.com
            </p>
            <p>
              <strong>Follow us on social media:</strong>
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-primary hover:text-blue-700 transition-colors">Twitter</a>
              <a href="#" className="text-primary hover:text-blue-700 transition-colors">Facebook</a>
              <a href="#" className="text-primary hover:text-blue-700 transition-colors">Instagram</a>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}