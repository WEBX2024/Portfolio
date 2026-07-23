import Section from '../components/Section';
import ExperienceCard from '../components/ExperienceCard';
import ScrollReveal from '../components/ScrollReveal';
import { experience } from '../data/experience';

export default function Experience() {
  return (
    <Section
      id="experience"
      label="Where I've worked"
      title="Experience"
      subtitle="My professional journey and contributions."
      alt
    >
      <div className="experience__timeline">
        {experience.map((entry, index) => (
          <ScrollReveal key={entry.id} delay={0.1 * index}>
            <ExperienceCard entry={entry} />
          </ScrollReveal>
        ))}
      </div>
    </Section>
  );
}
