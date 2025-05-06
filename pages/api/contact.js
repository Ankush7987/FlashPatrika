import axios from 'axios';

/**
 * API route for handling contact form submissions
 * This forwards the request to the backend API
 */
export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Get form data from request body
    const { name, email, subject, message } = req.body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ 
        status: 'error', 
        message: 'All fields are required: name, email, subject, and message' 
      });
    }

    // Forward the request to the backend API
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api';
    // Remove '/api' from the end if it exists to avoid duplication
    const baseUrl = apiBaseUrl.endsWith('/api') ? apiBaseUrl : `${apiBaseUrl}/api`;
    const response = await axios.post(`${baseUrl}/contact`, req.body);

    // Return the response from the backend
    return res.status(response.status).json(response.data);
  } catch (error) {
    console.error('Error in contact API route:', error);
    
    // Handle different types of errors
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      return res.status(error.response.status).json({
        status: 'error',
        message: error.response.data.message || 'Error submitting form'
      });
    } else if (error.request) {
      // The request was made but no response was received
      return res.status(503).json({
        status: 'error',
        message: 'Unable to connect to the server. Please try again later.'
      });
    } else {
      // Something happened in setting up the request that triggered an Error
      return res.status(500).json({
        status: 'error',
        message: 'An unexpected error occurred. Please try again later.'
      });
    }
  }
}