import '../styles/About.css';
import heroImg from '../assets/heroImg.png';

const About = () => {
  return (
    <section className="about">
      <div className="about-content">
        <div className="about-text">
          <h2>Hello, I'm Atindra Ghosh</h2>
          <div className="about-description">
            <p>
              A passionate and versatile creator at the intersection of design and technology. 
              With a strong foundation in <strong>Information Technology (B.Tech) </strong>and hands-on experience 
              in <strong>software development, web technologies, and graphic design </strong>, I bring ideas to life 
              with both logic and aesthetics.
            </p>
            <p>
              My journey spans from building full-stack web applications using <strong>React.js, Node.js, 
              and MongoDB, to designing compelling visuals and dashboards with Canva, Adobe Photoshop, 
              and Lightroom CC</strong>. Whether it's coding an authentication system or crafting engaging 
              social media creatives, I strive to create solutions that are not only functional but 
              visually impactful.
            </p>
            <p>
              <strong>A quick learner and deep thinker, I enjoy working in collaborative environments that 
              challenge me to grow</strong>. Through my projects and simulations—including contributions to 
              a <strong>state-aided medical project and Deloitte's job simulation </strong>, I've developed a unique 
              blend of technical precision and creative flair.
            </p>
            <p>
              Driven by curiosity and backed by skills in <strong>DSA, Power BI, GitHub, and more </strong>, I aim 
              to build meaningful digital experiences—beautifully coded and thoughtfully designed.
            </p>
          </div>
        </div>
        <div className="about-image">
          <div className="profile-frame">
            <img src={heroImg} alt="Atindra Ghosh" className="profile-img" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
