import { processContactSubmission } from '../services/contactService.js';

/**
 * Handle POST /api/contact
 */
export async function handleContactSubmission(req, res) {
  try {
    const result = await processContactSubmission(req.body);

    return res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    console.error('Contact submission error:', error);

    return res.status(500).json({
      success: false,
      message: 'An unexpected error occurred. Please try again later.',
    });
  }
}
