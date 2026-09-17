import styles from './PersonCard.module.css';
import { getAnimalEmoji } from '../utils/animalEmoji';
import { useState, useEffect } from 'react';
import { calculateWorkExperience } from '../utils/calculateWorkExperience';
import useAxios from '../hooks/useAxios';
import React from 'react';
import { Button, Card, CardContent, Typography } from '@mui/material';

const PersonCard = ({
  id,
  name,
  title,
  salary,
  phone,
  email,
  animal,
  startDate,
  location,
  department,
  skills,
  updateEmployee,
  deleteEmployee,
}) => {
  // ----------------------------
  // Custom Hook
  // ----------------------------
  const { put, del } = useAxios(); // ALWAYS at the top

  // ----------------------------
  // Helper: get initial form data
  // ----------------------------
  const getInitialFormData = () => ({
    salary: salary || '',
    location: location || '',
    department: department || '',
    skills: skills ? skills.join(', ') : '',
  });

  // ----------------------------
  // State
  // ----------------------------
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(getInitialFormData());
  const [savedMessage, setSavedMessage] = useState('');

  // Sync formData when props change
  useEffect(() => {
    setFormData(getInitialFormData());
  }, [salary, location, department, skills]);

  // Calculate work experience
  const workExperience = calculateWorkExperience(startDate);

  // ----------------------------
  // Handlers
  // ----------------------------
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleEdit = () => setIsEditing((prev) => !prev);

  const handleSave = () => {
    const updatedEmployee = {
      id,
      name,
      title,
      phone,
      email,
      animal,
      startDate,
      salary: formData.salary,
      location: formData.location,
      department: formData.department,
      skills: formData.skills.split(',').map((skill) => skill.trim()),
    };

    put(`https://hrapp-bec7.onrender.com/employees/${id}`, updatedEmployee)
      .then((res) => {
        updateEmployee(res.data);
        setIsEditing(false);
        setSavedMessage('Changes saved!');
        setTimeout(() => setSavedMessage(''), 2000);
      })
      .catch((err) => console.error('Error updating employee:', err.message));
  };
  // Delete employee handler
  const handleDelete = () => {
    if (!window.confirm('Are you sure you want to delete this employee?')) {
      return;
    }
    del(`https://hrapp-bec7.onrender.com/employees/${id}`)
      .then(() => {
        deleteEmployee(id);
      })
      .catch((err) => console.error('Error deleting employee:', err.message));
  };

  // ----------------------------
  // Render helpers
  // ----------------------------
  const editFields = [
    { name: 'salary', label: 'Salary', type: 'number' },
    { name: 'location', label: 'Location', type: 'text' },
    { name: 'department', label: 'Department', type: 'text' },
    { name: 'skills', label: 'Skills (comma separated)', type: 'text' },
  ];

  const renderEditForm = () => (
    <div className={styles.personEditForm}>
      {editFields.map((field) => (
        <div key={field.name}>
          <label>{field.label}:</label>
          <input
            type={field.type}
            name={field.name}
            value={formData[field.name]}
            onChange={handleChange}
          />
        </div>
      ))}
      <div className={styles.editButtons}>
        <button onClick={toggleEdit}>Cancel</button>
        <button onClick={handleSave}>Save</button>
      </div>
    </div>
  );

  const renderDisplayCard = () => (
    <Card className={styles.person} sx={{ padding: 2, marginBottom: 2 }}>
      <CardContent>
        {savedMessage && (
          <Typography
            className={styles.savedMessage}
            variant="subtitle2"
            sx={{ color: 'green' }}
          >
            {savedMessage}
          </Typography>
        )}

        {workExperience.years > 0 && workExperience.years % 5 === 0 && (
          <Typography className={styles.reminder} variant="body2">
            🎉 Schedule recognition meeting 🎉
          </Typography>
        )}

        {workExperience.years === 0 && workExperience.months < 6 && (
          <Typography className={styles.reminder} variant="body2">
            🔔 Schedule probation review 🔔
          </Typography>
        )}

        <div className={styles.headerRow}>
          <div className={styles.name}>
            <span className={styles.animalIcon}>{getAnimalEmoji(animal)}</span>{' '}
            <Typography variant="h6" component="div">
              {name}{' '}
              <Typography
                variant="subtitle2"
                component="span"
                className={styles.title}
              >
                ({title})
              </Typography>
            </Typography>
            <Button
              variant="outlined"
              color="error"
              onClick={handleDelete}
              className={styles.deleteButtonUnderName}
            >
              Remove
            </Button>
          </div>
        </div>

        <div className={styles.headerRow}>
          <Typography className={styles.department}>
            Department: {department}
          </Typography>
          <Typography className={styles.salary}>Salary: {salary}</Typography>
        </div>

        <div className={styles.infoRow}>
          <Typography className={styles.email}>Email: {email}</Typography>
          <Typography className={styles.phone}>Phone: {phone}</Typography>
          <Typography className={styles.location}>
            Location: {location}
          </Typography>
        </div>

        <Typography className={styles.startDate}>
          Start Date: {startDate}
        </Typography>
        <Typography className={styles.workExperience}>
          Work Experience:
          {workExperience.years > 0 &&
            ` ${workExperience.years} year${workExperience.years > 1 ? 's' : ''}`}
          {workExperience.months > 0 &&
            ` ${workExperience.months} month${workExperience.months > 1 ? 's' : ''}`}
        </Typography>

        <div className={styles.skillsSection}>
          <div className={styles.skillsList}>
            {skills?.map((skill, i) => (
              <Typography variant="body2" key={i} className={styles.skillBox}>
                {skill}
              </Typography>
            ))}
          </div>
        </div>
        <Button
          variant="contained"
          onClick={toggleEdit}
          className={styles.editButton}
        >
          Edit
        </Button>
      </CardContent>
    </Card>
  );

  return isEditing ? renderEditForm() : renderDisplayCard();
};

export default PersonCard;
