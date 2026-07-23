/**
 * Contact form input validation middleware.
 * Validates and sanitizes incoming contact form data.
 */

export function validateContactInput(req, res, next) {
  const { name, email, subject, message } = req.body;
  const errors = [];

  // Name validation
  if (!name || typeof name !== 'string' || !name.trim()) {
    errors.push({ field: 'name', message: 'Name is required' });
  } else if (name.trim().length > 100) {
    errors.push({ field: 'name', message: 'Name must be under 100 characters' });
  }

  // Email validation
  if (!email || typeof email !== 'string' || !email.trim()) {
    errors.push({ field: 'email', message: 'Email is required' });
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    errors.push({ field: 'email', message: 'Please provide a valid email address' });
  }

  // Subject validation
  if (!subject || typeof subject !== 'string' || !subject.trim()) {
    errors.push({ field: 'subject', message: 'Subject is required' });
  } else if (subject.trim().length > 200) {
    errors.push({ field: 'subject', message: 'Subject must be under 200 characters' });
  }

  // Message validation
  if (!message || typeof message !== 'string' || !message.trim()) {
    errors.push({ field: 'message', message: 'Message is required' });
  } else if (message.trim().length < 10) {
    errors.push({ field: 'message', message: 'Message must be at least 10 characters' });
  } else if (message.trim().length > 5000) {
    errors.push({ field: 'message', message: 'Message must be under 5000 characters' });
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors,
    });
  }

  // Sanitize: trim all fields
  req.body.name = name.trim();
  req.body.email = email.trim().toLowerCase();
  req.body.subject = subject.trim();
  req.body.message = message.trim();

  next();
}
