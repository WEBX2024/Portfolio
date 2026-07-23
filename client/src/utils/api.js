/**
 * API utility for backend communication.
 * Uses the Vite proxy in development (/api → localhost:5000).
 */

const API_BASE = '/api';

/**
 * Submit the contact form to the backend.
 * @param {Object} data - { name, email, subject, message }
 * @returns {Promise<Object>} - Response JSON
 */
export async function submitContactForm(data) {
  const response = await fetch(`${API_BASE}/contact`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || 'Something went wrong. Please try again.');
  }

  return result;
}
