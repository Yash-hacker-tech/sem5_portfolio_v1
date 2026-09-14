import ContactForm from '../components/ContactForm';


function Contact() {
  return (
    <main className="contact-page page-enter">
      <section className="section" aria-labelledby="contact-heading">
        <div className="container">
          <h1 className="section-title" id="contact-heading">Get in touch</h1>
          <p className="section-subtitle">
            Have a project idea, internship opportunity, or just want to say hi?
          </p>

          <div className="contact-layout">
            <div className="contact-info">
              <h2>Let's connect</h2>
              <p>
                I'm open to SDE / ML internship opportunities, collaborative projects,
                and research discussions. Expect a reply within 24 hours on weekdays.
              </p>

              <ul className="contact-channels" aria-label="Contact channels">
                {[
                  { icon: '📧', label: 'Email', value: 'y.sanghi2007@gmail.com', href: 'mailto:y.sanghi2007@gmail.com' },
                  { icon: '🐙', label: 'GitHub', value: '@Yash-hacker-tech', href: 'https://github.com/Yash-hacker-tech' },
                  { icon: '💼', label: 'LinkedIn', value: 'linkedin.com/in/yash', href: 'https://linkedin.com' },
                  { icon: '🏫', label: 'Campus', value: 'NIT Warangal, Telangana', href: null },
                ].map(({ icon, label, value, href }) => (
                  <li key={label} className="contact-channel">
                    <span className="contact-channel__icon" aria-hidden="true">{icon}</span>
                    <div>
                      <span className="contact-channel__label">{label}</span>
                      {href ? (
                        <a href={href} target="_blank" rel="noopener noreferrer" className="contact-channel__value">
                          {value}
                        </a>
                      ) : (
                        <span className="contact-channel__value">{value}</span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="contact-form-wrapper">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Contact;
