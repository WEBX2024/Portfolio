import React, { useState } from "react"; // Import useState
import emailjs from "@emailjs/browser"; // Import emailjs
import "../styles/Contact.css";
import { FaLinkedin, FaGithub, FaFacebook, FaInstagram } from "react-icons/fa";

const Contact = () => {
  // State for form inputs
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // Custom message box function (reusable)
  const showMessageBox = (msg, type = "alert") => {
    const messageBox = document.createElement("div");
    messageBox.className = `custom-message-box ${type}`; // Add type for styling
    messageBox.innerHTML = `
            <p>${msg}</p>
            <button onclick="this.parentNode.remove()">OK</button>
        `;
    document.body.appendChild(messageBox);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!name.trim() || !email.trim() || !message.trim()) {
      showMessageBox("Please fill in all required fields.");
      return;
    }

    // EmailJS service IDs and template IDs
    // REPLACE WITH YOUR ACTUAL EmailJS Service ID, Template ID, and Public Key
    const serviceId = "service_gbncocp"; // e.g., 'service_xxxxxx'
    const templateId = "template_soljocl"; // e.g., 'template_yyyyyy'
    const publicKey = "4ylpdWpCW3KfPBXXi"; // e.g., 'user_zzzzzz'

    // Send email using EmailJS
    emailjs.sendForm(serviceId, templateId, e.target, publicKey).then(
      (result) => {
        console.log("Email successfully sent!", result.text);
        showMessageBox("Message sent successfully!", "success");
        // Clear form fields after successful submission
        setName("");
        setEmail("");
        setMessage("");
      },
      (error) => {
        console.error("Failed to send email:", error.text);
        showMessageBox(
          "Failed to send message. Please try again later.",
          "error"
        );
      }
    );
  };

  return (
    <section className="contact">
      <div className="contact-content">
        <div className="contact-info">
          <h2>Get in Touch</h2>
          <p>
            Feel free to reach out to me for any questions or opportunities!
          </p>
          <div className="contact-details">
            <p>
              <strong>EMAIL:</strong> atindraghosh2017@gmail.com
            </p>
            <p>
              <strong>EMAIL:</strong> atindra.ghosh.0073@gmail.com
            </p>
            <p>
              <strong>PHONE:</strong> +91-6295884665
            </p>
            <p>
              <strong>LOCATION:</strong> Purba Bardhaman, West Bengal, India
            </p>
            <div className="social-links">
              <a
                href="https://www.linkedin.com/in/atindra-ghosh-8099b9229/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
              >
                <FaLinkedin className="social-icon" />
              </a>
              <a
                href="https://github.com/WEBX2024"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
              >
                <FaGithub className="social-icon" />
              </a>
              <a
                href="https://www.facebook.com/atindra.ghosh.967"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook Profile"
              >
                <FaFacebook className="social-icon" />
              </a>
              <a
                href="https://www.instagram.com/atindra_ghosh_official/?hl=en"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram Profile"
              >
                <FaInstagram className="social-icon" />
              </a>
            </div>
          </div>
        </div>
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="from_name" // Name attribute must match EmailJS template variable
              placeholder="e.g: Akash dubey "
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="from_email" // Name attribute must match EmailJS template variable
              placeholder="youremail@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="message" className="form-label">
              Message
            </label>
            <textarea
              id="message"
              name="message" // Name attribute must match EmailJS template variable
              rows="5"
              placeholder="Any message for me"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            ></textarea>
          </div>
          <button type="submit" className="contact-form-button">
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
