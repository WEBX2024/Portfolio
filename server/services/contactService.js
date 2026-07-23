/**
 * Contact service abstraction.
 *
 * Currently logs the contact submission to the console.
 * Replace the implementation with a real email service (e.g., Nodemailer,
 * SendGrid, Resend) or database persistence when ready.
 */

// TODO: Integrate a real email provider here.
// Example:
//   import nodemailer from 'nodemailer';
//   import config from '../config/index.js';
//
//   const transporter = nodemailer.createTransport({
//     host: config.email.host,
//     port: config.email.port,
//     auth: { user: config.email.user, pass: config.email.pass },
//   });

/**
 * Process a contact form submission.
 * @param {Object} data - { name, email, subject, message }
 * @returns {Promise<Object>} - Result of the operation
 */
export async function processContactSubmission(data) {
  const { name, email, subject, message } = data;

  // Log the submission (replace with email/database logic)
  console.log('━━━ New Contact Submission ━━━');
  console.log(`  From:    ${name} <${email}>`);
  console.log(`  Subject: ${subject}`);
  console.log(`  Message: ${message}`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  // Simulate async processing
  return {
    success: true,
    message: 'Thank you for your message! I will get back to you soon.',
  };
}
