import { personal } from '../data/personal';
import { socialLinks } from '../data/navigation';
import Button from '../components/Button';
import ScrollReveal from '../components/ScrollReveal';
import Typewriter from '../components/Typewriter';
import ParticleBackground from '../components/ParticleBackground';

export default function Hero() {
  return (
    <section id="hero" className="hero">
      <div className="hero__bg" style={{
        backgroundImage: `url('/images/user_hero_bg.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}>
        <ParticleBackground />
      </div>

      <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        <div className="hero__content" style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', zIndex: 1, pointerEvents: 'none' }}>
          <ScrollReveal delay={0.1}>
            <p className="hero__greeting" style={{ letterSpacing: 'var(--letter-spacing-wide)', textTransform: 'uppercase', fontSize: 'var(--font-size-sm)' }}>
              {personal.title}
            </p>
          </ScrollReveal>
          
          <ScrollReveal delay={0.2}>
            <h1 className="hero__name" style={{ fontSize: 'var(--font-size-5xl)', lineHeight: 1.1, marginBottom: 'var(--space-6)' }}>
              <Typewriter text={`I am ${personal.firstName}.`} delay={0.8} speed={120} />
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <p className="hero__description" style={{ fontSize: 'var(--font-size-xl)', marginBottom: 'var(--space-10)', maxWidth: '600px' }}>
              {personal.tagline}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <div className="hero__actions" style={{ justifyContent: 'center', pointerEvents: 'auto' }}>
              <Button href="#projects" variant="primary" size="lg" style={{ borderRadius: 'var(--radius-full)' }}>
                View Work
              </Button>
              <Button href="#contact" variant="outline" size="lg" style={{ borderRadius: 'var(--radius-full)' }}>
                Contact Me
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
