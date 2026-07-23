import { useState, useCallback } from 'react';
import { useFormValidation } from '../hooks/useFormValidation';
import emailjs from '@emailjs/browser';
import Button from './Button';

const initialValues = {
  name: '',
  email: '',
  subject: '',
  message: '',
};

function validate(values) {
  const errors = {};

  if (!values.name.trim()) {
    errors.name = 'Name is required';
  }

  if (!values.email.trim()) {
    errors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!values.subject.trim()) {
    errors.subject = 'Subject is required';
  }

  if (!values.message.trim()) {
    errors.message = 'Message is required';
  } else if (values.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters';
  }

  return errors;
}

export default function ContactForm() {
  const { values, errors, touched, handleChange, handleBlur, validateAll, reset } =
    useFormValidation(initialValues, validate);

  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [serverMessage, setServerMessage] = useState('');

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      if (!validateAll()) return;

      setStatus('submitting');
      setServerMessage('');

      try {
        const templateParams = {
          from_name: values.name,
          reply_to: values.email,
          subject: values.subject,
          message: values.message,
        };

        const result = await emailjs.send(
          import.meta.env.VITE_EMAILJS_SERVICE_ID,
          import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
          templateParams,
          { publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY }
        );

        if (result.status === 200) {
          setStatus('success');
          setServerMessage('Message sent successfully! I will get back to you soon.');
          reset();
        } else {
          throw new Error('Email sending failed with status: ' + result.status);
        }
      } catch (err) {
        setStatus('error');
        // EmailJS provides error details in err.text
        const errorMessage = err.text || err.message || 'Unknown error occurred.';
        setServerMessage(`Failed to send message: ${errorMessage}`);
        console.error('EmailJS Error:', err);
      }
    },
    [values, validateAll, reset]
  );

  if (status === 'success') {
    return (
      <div className="contact__form">
        <div className="form__success">
          <div className="form__success-icon">✓</div>
          <h4>Message Sent!</h4>
          <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-6)' }}>
            {serverMessage}
          </p>
          <Button variant="outline" onClick={() => setStatus('idle')}>
            Send Another Message
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form className="contact__form" onSubmit={handleSubmit} noValidate>
      <div className="form__group">
        <label htmlFor="contact-name" className="form__label">
          Name
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          className={`form__input${touched.name && errors.name ? ' form__input--error' : ''}`}
          placeholder="Your name"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          autoComplete="name"
        />
        {touched.name && errors.name && (
          <p className="form__error" role="alert">
            {errors.name}
          </p>
        )}
      </div>

      <div className="form__group">
        <label htmlFor="contact-email" className="form__label">
          Email
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          className={`form__input${touched.email && errors.email ? ' form__input--error' : ''}`}
          placeholder="your.email@example.com"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          autoComplete="email"
        />
        {touched.email && errors.email && (
          <p className="form__error" role="alert">
            {errors.email}
          </p>
        )}
      </div>

      <div className="form__group">
        <label htmlFor="contact-subject" className="form__label">
          Subject
        </label>
        <input
          id="contact-subject"
          name="subject"
          type="text"
          className={`form__input${touched.subject && errors.subject ? ' form__input--error' : ''}`}
          placeholder="What is this about?"
          value={values.subject}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {touched.subject && errors.subject && (
          <p className="form__error" role="alert">
            {errors.subject}
          </p>
        )}
      </div>

      <div className="form__group">
        <label htmlFor="contact-message" className="form__label">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          className={`form__textarea${touched.message && errors.message ? ' form__textarea--error' : ''}`}
          placeholder="Tell me about your project or idea..."
          rows={5}
          value={values.message}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {touched.message && errors.message && (
          <p className="form__error" role="alert">
            {errors.message}
          </p>
        )}
      </div>

      {status === 'error' && (
        <p className="form__error" role="alert" style={{ marginBottom: 'var(--space-4)' }}>
          {serverMessage}
        </p>
      )}

      <Button
        type="submit"
        variant="primary"
        size="lg"
        disabled={status === 'submitting'}
        style={{ width: '100%' }}
      >
        {status === 'submitting' ? 'Sending...' : 'Send Message'}
      </Button>
    </form>
  );
}
