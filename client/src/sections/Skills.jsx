import Section from '../components/Section';
import SkillCard from '../components/SkillCard';
import ScrollReveal from '../components/ScrollReveal';
import IconMapper from '../components/IconMapper';
import { skillCategories } from '../data/skills';

export default function Skills() {
  return (
    <Section
      id="skills"
      label="What I work with"
      title="Technical Skills"
      subtitle="Technologies and tools I use to bring ideas to life."
      alt
    >
      <div className="skills__categories" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-6)' }}>
        {skillCategories.map((category, index) => (
          <ScrollReveal key={category.name} delay={0.1 * index} className="skills__category bento-box">
            <h3 className="skills__category-title">
              <span className="skills__category-icon" aria-hidden="true">
                <IconMapper icon={category.icon} />
              </span>
              {category.name}
            </h3>
            <div className="skills__list">
              {category.skills.map((skill) => (
                <SkillCard key={skill} name={skill} />
              ))}
            </div>
          </ScrollReveal>
        ))}
      </div>
    </Section>
  );
}
