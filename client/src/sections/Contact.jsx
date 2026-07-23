import Section from '../components/Section';
import ContactForm from '../components/ContactForm';
import { contactInfo } from '../data/personal';
import SocialLinks from '../components/SocialLinks';
import IconMapper from '../components/IconMapper';
import { socialLinks } from '../data/navigation';

export default function Contact() {
  return (
    <Section
      id="contact"
      label={contactInfo.label}
      title={contactInfo.heading}
      subtitle={contactInfo.subtitle}
    >
      <div className="contact__grid">
        <div className="contact__info">
          <h3>Get in Touch</h3>
          <p className="contact__info-text">{contactInfo.description}</p>

          <div className="contact__details">
            {contactInfo.details.map((detail) => (
              <div key={detail.label} className="contact__detail">
                <span className="contact__detail-icon" aria-hidden="true">
                  <IconMapper icon={detail.icon} />
                </span>
                <div>
                  <strong>{detail.label}:</strong> {detail.value}
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 'var(--space-8)' }}>
            <SocialLinks links={socialLinks} />
          </div>
        </div>

        <ContactForm />
      </div>
    </Section>
  );
}
