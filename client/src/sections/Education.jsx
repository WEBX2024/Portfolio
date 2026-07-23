import Section from '../components/Section';
import EducationCard from '../components/EducationCard';
import ScrollReveal from '../components/ScrollReveal';
import { education } from '../data/education';

export default function Education() {
  return (
    <Section
      id="education"
      label="Academic Background"
      title="Education"
      subtitle="My formal academic qualifications."
    >
      <div className="experience__timeline">
        {education.map((entry, index) => (
          <ScrollReveal key={entry.id} delay={0.1 * index}>
            <EducationCard entry={entry} />
          </ScrollReveal>
        ))}
      </div>
    </Section>
  );
}
