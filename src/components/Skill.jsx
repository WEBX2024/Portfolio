import React, { useState, useEffect } from 'react';
import '../styles/Skill.css';

const Skills = () => {
    const [skillsData, setSkillsData] = useState(() => {
        try {
            const savedSkills = localStorage.getItem('portfolioSkills');
            return savedSkills ? JSON.parse(savedSkills) : [];
        } catch (error) {
            console.error("Failed to parse skills from localStorage", error);
            return [];
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem('portfolioSkills', JSON.stringify(skillsData));
        } catch (error) {
            console.error("Failed to save skills to localStorage", error);
        }
    }, [skillsData]);

    const [newSkillCategory, setNewSkillCategory] = useState('');
    const [newSkillName, setNewSkillName] = useState('');
    const [newSkillImage, setNewSkillImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    const handleCategoryChange = (e) => {
        setNewSkillCategory(e.target.value);
    };

    const handleSkillNameChange = (e) => {
        setNewSkillName(e.target.value);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.type !== 'image/png') {
                // Using a custom message box instead of alert()
                const messageBox = document.createElement('div');
                messageBox.className = 'custom-message-box';
                messageBox.innerHTML = `
                    <p>Please upload only PNG images.</p>
                    <button onclick="this.parentNode.remove()">OK</button>
                `;
                document.body.appendChild(messageBox);

                setNewSkillImage(null);
                setImagePreview(null);
                e.target.value = '';
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                setNewSkillImage(reader.result);
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setNewSkillImage(null);
            setImagePreview(null);
        }
    };

    const handleAddSkill = (e) => {
        e.preventDefault();

        if (!newSkillCategory.trim() || !newSkillName.trim()) { // Use .trim() to handle empty spaces
            const messageBox = document.createElement('div');
            messageBox.className = 'custom-message-box';
            messageBox.innerHTML = `
                <p>Please enter both a category and a skill name.</p>
                <button onclick="this.parentNode.remove()">OK</button>
            `;
            document.body.appendChild(messageBox);
            return;
        }

        const skillToAdd = {
            name: newSkillName.trim(), // Trim skill name
            image: newSkillImage
        };

        const updatedSkillsData = [...skillsData];
        const categoryIndex = updatedSkillsData.findIndex(cat => cat.category.toLowerCase() === newSkillCategory.trim().toLowerCase()); // Case-insensitive category check

        if (categoryIndex !== -1) {
            // Check for duplicate skill name within the existing category (case-insensitive)
            const isDuplicate = updatedSkillsData[categoryIndex].items.some(
                item => item.name.toLowerCase() === skillToAdd.name.toLowerCase()
            );

            if (isDuplicate) {
                const messageBox = document.createElement('div');
                messageBox.className = 'custom-message-box';
                messageBox.innerHTML = `
                    <p>Skill "${skillToAdd.name}" already exists in the "${newSkillCategory}" category.</p>
                    <button onclick="this.parentNode.remove()">OK</button>
                `;
                document.body.appendChild(messageBox);
                return;
            }

            updatedSkillsData[categoryIndex] = {
                ...updatedSkillsData[categoryIndex],
                items: [...updatedSkillsData[categoryIndex].items, skillToAdd]
            };
        } else {
            // If category does not exist, create a new category
            updatedSkillsData.push({
                category: newSkillCategory.trim(), // Trim new category name
                items: [skillToAdd]
            });
        }

        setSkillsData(updatedSkillsData);

        setNewSkillCategory('');
        setNewSkillName('');
        setNewSkillImage(null);
        setImagePreview(null);
        document.getElementById('skillImageInput').value = '';
    };

    const handleDeleteSkill = (categoryToDeleteFrom, skillNameToDelete) => {
        // Using a custom confirmation box instead of confirm()
        const confirmationBox = document.createElement('div');
        confirmationBox.className = 'custom-message-box';
        confirmationBox.innerHTML = `
            <p>Are you sure you want to delete "${skillNameToDelete}" from "${categoryToDeleteFrom}"?</p>
            <button id="confirmDeleteBtn">Yes</button>
            <button id="cancelDeleteBtn">No</button>
        `;
        document.body.appendChild(confirmationBox);

        document.getElementById('confirmDeleteBtn').onclick = () => {
            confirmationBox.remove(); // Remove confirmation box

            setSkillsData(prevSkillsData => {
                const updatedCategories = prevSkillsData.map(category => {
                    if (category.category === categoryToDeleteFrom) {
                        const filteredItems = category.items.filter(
                            item => item.name !== skillNameToDelete
                        );
                        return { ...category, items: filteredItems };
                    }
                    return category;
                }).filter(category => category.items.length > 0); // Remove category if it becomes empty

                return updatedCategories;
            });
        };

        document.getElementById('cancelDeleteBtn').onclick = () => {
            confirmationBox.remove(); // Remove confirmation box
        };
    };

    return (
        <section className="skills">

            <form className="add-skill-form" onSubmit={handleAddSkill}>
                <h2>Add New Skill</h2>
                <div className="form-group">
                    <label htmlFor="skillCategory" className='form-label'>Category:</label>
                    <input
                        type="text"
                        className='form-input'
                        id="skillCategory"
                        value={newSkillCategory}
                        onChange={handleCategoryChange}
                        placeholder="e.g., Frontend, Backend, Tools"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="skillName" className='form-label'>Skill Name:</label>
                    <input
                        type="text"
                        id="skillName"
                        className='form-input'
                        value={newSkillName}
                        onChange={handleSkillNameChange}
                        placeholder="e.g., MongoDB, Figma"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="skillImageInput" className='form-label'>Upload Image (PNG only):</label>
                    <input
                        type="file"
                        className='form-image-input'
                        id="skillImageInput"
                        accept=".png"
                        onChange={handleImageChange}
                    />
                    {imagePreview && (
                        <div className="image-preview-container">
                            <img src={imagePreview} alt="Skill Preview" className="image-preview" />
                        </div>
                    )}
                </div>

                <button type="submit" className="add-skill-button">+ ADD</button>
            </form>

            <div className="skills-container">
                {skillsData.length === 0 ? (
                    <p className="no-skills-message">No skills added yet !</p>
                ) : (
                    skillsData.map((category, index) => (
                        <div key={index} className="skill-category">
                            <h2>{category.category}</h2>
                            <div className="skill-items">
                                {category.items.length === 0 ? (
                                    <p className="no-items-message">No skills in this category yet.</p>
                                ) : (
                                    category.items.map((skill, i) => (
                                        <div key={i} className="skill-item">
                                            {skill.image && <img src={skill.image} alt={skill.name} className="skill-item-image" />}
                                            <span>{skill.name}</span>
                                            <button
                                                className="delete-skill-button"
                                                onClick={() => handleDeleteSkill(category.category, skill.name)}
                                                aria-label={`Delete ${skill.name}`}
                                            >
                                                &times; {}
                                            </button>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </section>
    );
};

export default Skills;
