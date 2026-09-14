import { useState } from 'react';
import { submitContact } from '../api';
const INITIAL = { name: '', email: '', subject: '', message: '' };
const INITIAL_ERRORS = { name: '', email: '', message: '' };

function validate(fields) {
  const errors = { ...INITIAL_ERRORS };
  if (!fields.name.trim()) errors.name = 'Name is required.';
  if (!fields.email.trim()) {
    errors.email = 'Email is required.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
    errors.email = 'Enter a valid email address.';
  }
  if (fields.message.trim().length < 10)
    errors.message = 'Message must be at least 10 characters.';
  return errors;
}

function hasErrors(errors) {
  return Object.values(errors).some(Boolean);
}

function ContactForm() {
  const [fields, setFields] = useState(INITIAL);
  const [errors, setErrors] = useState(INITIAL_ERRORS);
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [serverError, setServerError] = useState('');

  const handleChange = e => {
    const { name, value } = e.target;
    const next = { ...fields, [name]: value };
    setFields(next);
    if (touched[name]) setErrors(validate(next));
  };

  const handleBlur = e => {
    const { name } = e.target;
    setTouched(t => ({ ...t, [name]: true }));
    setErrors(validate(fields));
  };

  const currentErrors = validate(fields);
  const isDisabled = hasErrors(currentErrors);

  const handleSubmit = async e => {
    e.preventDefault();
    setTouched({ name: true, email: true, message: true });
    const errs = validate(fields);
    setErrors(errs);
    if (hasErrors(errs)) return;

    setStatus('sending');
    setServerError('');

    try {
      await submitContact({
        name: fields.name,
        email: fields.email,
        message: fields.message,
      });
      setStatus('success');
      setFields(INITIAL);  // reset form on success
    } catch (err) {
      setServerError(err.message || 'Network error — check your connection and try again.');
      setStatus('error');
    }
  };

  const handleReset = () => {
    setFields(INITIAL);
    setErrors(INITIAL_ERRORS);
    setTouched({});
    setStatus('idle');
    setServerError('');
  };

  /* ── Success screen ── */
  if (status === 'success') {
    return (
      <div className="contact-success" role="status">
        <div className="contact-success__icon" aria-hidden="true">
          <svg viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="26" cy="26" r="25" stroke="white" strokeWidth="2" className="success-circle" />
            <path d="M14 26l8 9 16-18" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="success-check" />
          </svg>
        </div>
        <h3>Message sent! 🎉</h3>
        <p>Thanks for reaching out, <strong>{fields.name}</strong>. I'll reply to <strong>{fields.email}</strong> within 24 hours on weekdays.</p>
        <button className="btn btn-outline" onClick={handleReset}>Send another message</button>
      </div>
    );
  }

  /* ── Form ── */
  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate aria-label="Contact form">
      <div className="form-row">
        <div className={`form-group${touched.name && errors.name ? ' form-group--error' : ''}`}>
          <label htmlFor="cf-name" className="form-label">Name <span aria-hidden="true">*</span></label>
          <input
            id="cf-name"
            name="name"
            type="text"
            className="form-input"
            value={fields.name}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Your full name"
            aria-required="true"
            aria-describedby={touched.name && errors.name ? 'err-name' : undefined}
            aria-invalid={!!(touched.name && errors.name)}
            disabled={status === 'sending'}
          />
          {touched.name && errors.name && (
            <span id="err-name" className="form-error" role="alert">{errors.name}</span>
          )}
        </div>

        <div className={`form-group${touched.email && errors.email ? ' form-group--error' : ''}`}>
          <label htmlFor="cf-email" className="form-label">Email <span aria-hidden="true">*</span></label>
          <input
            id="cf-email"
            name="email"
            type="email"
            className="form-input"
            value={fields.email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="you@example.com"
            aria-required="true"
            aria-describedby={touched.email && errors.email ? 'err-email' : undefined}
            aria-invalid={!!(touched.email && errors.email)}
            disabled={status === 'sending'}
          />
          {touched.email && errors.email && (
            <span id="err-email" className="form-error" role="alert">{errors.email}</span>
          )}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="cf-subject" className="form-label">Subject</label>
        <input
          id="cf-subject"
          name="subject"
          type="text"
          className="form-input"
          value={fields.subject}
          onChange={handleChange}
          placeholder="What's this about?"
          disabled={status === 'sending'}
        />
      </div>

      <div className={`form-group${touched.message && errors.message ? ' form-group--error' : ''}`}>
        <label htmlFor="cf-message" className="form-label">Message <span aria-hidden="true">*</span></label>
        <textarea
          id="cf-message"
          name="message"
          className="form-input form-textarea"
          value={fields.message}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Tell me what's on your mind…"
          rows={5}
          aria-required="true"
          aria-describedby={touched.message && errors.message ? 'err-message' : undefined}
          aria-invalid={!!(touched.message && errors.message)}
          disabled={status === 'sending'}
        />
        {touched.message && errors.message && (
          <span id="err-message" className="form-error" role="alert">{errors.message}</span>
        )}
        <span className="form-hint">{fields.message.length} / 10 chars minimum</span>
      </div>

      {/* Server-side error banner */}
      {status === 'error' && serverError && (
        <div className="form-server-error" role="alert">
          <span>⚠️</span> {serverError}
        </div>
      )}

      <button
        type="submit"
        id="cf-submit"
        className={`btn btn-primary contact-form__submit${status === 'sending' ? ' btn--loading' : ''}`}
        disabled={(isDisabled && Object.keys(touched).length > 0) || status === 'sending'}
        aria-disabled={(isDisabled && Object.keys(touched).length > 0) || status === 'sending'}
      >
        {status === 'sending' ? (
          <>
            <span className="btn-spinner" aria-hidden="true" />
            Sending…
          </>
        ) : (
          'Send message →'
        )}
      </button>

      <p className="form-privacy-note">
        📬 Your message is sent securely to <strong>y.sanghi2007@gmail.com</strong>. No spam, ever.
      </p>
    </form>
  );
}

export default ContactForm;
