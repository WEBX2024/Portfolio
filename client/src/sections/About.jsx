import Section from '../components/Section';
import ScrollReveal from '../components/ScrollReveal';
import IconMapper from '../components/IconMapper';
import { about } from '../data/personal';

export default function About() {
  return (
    <Section id="about" label={about.label} title={about.heading}>
      <div className="about__grid">
        <ScrollReveal delay={0.1} className="about__image-wrapper">
          <div className="about__image-container" style={{ borderRadius: 'var(--radius-xl)' }}>
            {about.profileImage ? (
              <img src={about.profileImage} alt="Profile photo" />
            ) : (
              <div className="about__image-placeholder" aria-hidden="true">
                👤
              </div>
            )}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2} className="about__text bento-box" style={{ background: 'transparent', padding: 0, border: 'none' }}>
          <h3>
            A passionate developer building for the web
          </h3>

          {about.bio.map((paragraph, index) => (
            <p key={index} className="about__bio">
              {paragraph}
            </p>
          ))}

          <div className="about__highlights" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
            {about.highlights.map((item) => (
              <div key={item.text} className="about__highlight bento-box" style={{ padding: 'var(--space-4)', display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                <span className="about__highlight-icon" aria-hidden="true">
                  <IconMapper icon={item.icon} />
                </span>
                <span style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)', color: 'var(--color-text-primary)' }}>{item.text}</span>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </Section>
  );
}
