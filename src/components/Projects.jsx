import React, { useState, useEffect } from 'react';
import '../styles/Projects.css';

const Projects = () => {
  // State to store projects, initialized from localStorage
  const [projects, setProjects] = useState(() => {
    try {
      const savedProjects = localStorage.getItem('portfolioProjects');
      return savedProjects ? JSON.parse(savedProjects) : [];
    } catch (error) {
      console.error("Failed to parse projects from localStorage", error);
      return [];
    }
  });

  // useEffect to save projects to localStorage whenever the projects state changes
  useEffect(() => {
    try {
      localStorage.setItem('portfolioProjects', JSON.stringify(projects));
    } catch (error) {
      console.error("Failed to save projects to localStorage", error);
    }
  }, [projects]);

  // State variables for the new project form inputs
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectDescription, setNewProjectDescription] = useState('');
  const [newProjectLink, setNewProjectLink] = useState('');
  const [newProjectFromDate, setNewProjectFromDate] = useState('');
  const [newProjectToDate, setNewProjectToDate] = useState('');
  const [isOngoing, setIsOngoing] = useState(false);
  const [newProjectDemoLink, setNewProjectDemoLink] = useState('');

  // Function to display custom message boxes
  const showMessageBox = (message) => {
    const messageBox = document.createElement('div');
    messageBox.className = 'custom-message-box';
    messageBox.innerHTML = `
      <p>${message}</p>
      <button onclick="this.parentNode.remove()">OK</button>
    `;
    document.body.appendChild(messageBox);
  };

  // Function to display custom confirmation boxes
  const showConfirmationBox = (message, onConfirm, onCancel) => {
    const confirmationBox = document.createElement('div');
    confirmationBox.className = 'custom-message-box';
    confirmationBox.innerHTML = `
      <p>${message}</p>
      <button id="confirmBtn">Yes</button>
      <button id="cancelBtn">No</button>
    `;
    document.body.appendChild(confirmationBox);

    document.getElementById('confirmBtn').onclick = () => {
      confirmationBox.remove();
      onConfirm();
    };

    document.getElementById('cancelBtn').onclick = () => {
      confirmationBox.remove();
      onCancel();
    };
  };

  // Handler for adding a new project
  const handleAddProject = (e) => {
    e.preventDefault(); // Prevent default form submission

    // Validate mandatory fields
    if (!newProjectName.trim() || !newProjectLink.trim() || !newProjectFromDate.trim()) {
      showMessageBox("Please fill in all mandatory fields: Project Name, Project Link, and From Date.");
      return;
    }

    if (!isOngoing && !newProjectToDate.trim()) {
      showMessageBox("Please fill in the To Date or check the 'Ongoing' checkbox.");
      return;
    }

    // New validation: To Date cannot be before From Date
    if (!isOngoing && newProjectFromDate && newProjectToDate && newProjectToDate < newProjectFromDate) {
      showMessageBox("The 'To Date' cannot be earlier than the 'From Date'.");
      return;
    }

    // Create a new project object
    const newProject = {
      title: newProjectName.trim(),
      description: newProjectDescription.trim(),
      github: newProjectLink.trim(),
      live: newProjectDemoLink.trim(), // Use 'live' for the demo link
      dates: isOngoing ? `${newProjectFromDate} - Ongoing` : `${newProjectFromDate} - ${newProjectToDate}`,
    };

    // Add the new project to the projects state
    setProjects(prevProjects => [...prevProjects, newProject]);

    // Clear form fields after submission
    setNewProjectName('');
    setNewProjectDescription('');
    setNewProjectLink('');
    setNewProjectFromDate('');
    setNewProjectToDate('');
    setIsOngoing(false);
    setNewProjectDemoLink('');
  };

  // Handler for deleting a project
  const handleDeleteProject = (projectTitle) => {
    showConfirmationBox(
      `Are you sure you want to delete "${projectTitle}"?`,
      () => {
        setProjects(prevProjects => prevProjects.filter(project => project.title !== projectTitle));
      },
      () => {
        // Do nothing if cancelled
      }
    );
  };

  return (
    <section className="projects">
      {/* Add Project Form */}
      <form className="add-project-form" onSubmit={handleAddProject}>
        <h2>Add New Project</h2>
        <div className="form-group">
          <label htmlFor="projectName" className='form-label'>Project Name<span className="mandatory">*</span>:</label>
          <input
            type="text"
            className='form-input'
            id="projectName"
            value={newProjectName}
            onChange={(e) => setNewProjectName(e.target.value)}
            placeholder="e.g., Portfolio Website"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="projectDescription" className='form-label'>Project Description:</label>
          <textarea
            className='form-input'
            id="projectDescription"
            value={newProjectDescription}
            onChange={(e) => setNewProjectDescription(e.target.value)}
            placeholder="Briefly describe your project"
            rows="3"
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="projectLink" className='form-label'>Project GitHub Link<span className="mandatory">*</span>:</label>
          <input
            type="url"
            className='form-input'
            id="projectLink"
            value={newProjectLink}
            onChange={(e) => setNewProjectLink(e.target.value)}
            placeholder="https://github.com/yourusername/project"
            required
          />
        </div>

        <div className="form-group date-group">
          <div className="date-input-wrapper">
            <label htmlFor="projectFromDate" className='form-label'>From Date<span className="mandatory">*</span>:</label>
            <input
              type="date"
              className='form-input'
              id="projectFromDate"
              value={newProjectFromDate}
              onChange={(e) => setNewProjectFromDate(e.target.value)}
              required
            />
          </div>
          <div className="date-input-wrapper">
            <label htmlFor="projectToDate" className='form-label'>To Date:</label>
            <input
              type="date"
              className='form-input'
              id="projectToDate"
              value={newProjectToDate}
              onChange={(e) => setNewProjectToDate(e.target.value)}
              disabled={isOngoing} // Disable if ongoing
            />
          </div>
          <div className="checkbox-group">
            <input
              type="checkbox"
              id="isOngoing"
              checked={isOngoing}
              onChange={(e) => {
                setIsOngoing(e.target.checked);
                // If ongoing is checked, clear the 'To Date' field
                if (e.target.checked) {
                  setNewProjectToDate('');
                }
              }}
            />
            <label htmlFor="isOngoing" className='form-label'>Ongoing</label>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="projectDemoLink" className='form-label'>Demo Link:</label>
          <input
            type="url"
            className='form-input'
            id="projectDemoLink"
            value={newProjectDemoLink}
            onChange={(e) => setNewProjectDemoLink(e.target.value)}
            placeholder="https://project.netlify.app"
          />
        </div>

        <button type="submit" className="add-project-button">+ ADD PROJECT</button>
      </form>

      {/* Projects Display Section */}
      <h2>Welcome! This is the cave where I store my hand made things</h2>
      <div className="projects-grid">
        {projects.length === 0 ? (
          <p className="no-projects-message">No projects added yet!</p>
        ) : (
          projects.map((project, index) => (
            <div className="project-card" key={index}>
              <h3>{project.title}</h3>
              <p className="project-dates">{project.dates}</p> {/* Display dates */}
              <p>{project.description}</p>
              {/* Technologies removed as per original file, but can be added back if needed */}
              {/* <div className="technologies">
                {project.technologies && project.technologies.map((tech, i) => (
                  <span key={i} className="tech-tag">{tech}</span>
                ))}
              </div> */}
              <div className="project-links">
                <a href={project.github} target="_blank" rel="noopener noreferrer">GitHub</a>
                {project.live && ( // Conditionally render Live Demo button
                  <a href={project.live} target="_blank" rel="noopener noreferrer">Live Demo</a>
                )}
              </div>
              <button
                className="delete-project-button"
                onClick={() => handleDeleteProject(project.title)}
                aria-label={`Delete ${project.title}`}
              >
                &times;
              </button>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default Projects;
