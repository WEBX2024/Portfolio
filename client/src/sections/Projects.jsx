import Section from '../components/Section';
import ProjectCard from '../components/ProjectCard';
import ScrollReveal from '../components/ScrollReveal';
import { projects } from '../data/projects';

export default function Projects() {
  return (
    <Section
      id="projects"
      label="Selected Work"
      title="Projects"
      subtitle="A showcase of some of my recent work in web development and AI."
    >
      <div className="carousel-container">
        <div className="carousel-track">
          {[...projects, ...projects].map((project, index) => (
            <div key={`${project.id}-${index}`} style={{ width: '380px', flexShrink: 0 }}>
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
