import {
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from '@mui/material';
import styles from './AddEmployee.module.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';
// LIST ALL FORM FIELDS HERE
const fields = [
  'name',
  'title',
  'salary',
  'phone',
  'email',
  'animal',
  'startDate',
  'location',
  'department',
  'skills',
];

//capitalize function for labels
const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

const AddEmployee = ({ formData, setFormData, onAddEmployee }) => {
  const navigate = useNavigate();

  // ----------------------------
  // Handlers
  // ----------------------------
  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onAddEmployee();
    // Reset form
    setFormData(Object.fromEntries(fields.map((f) => [f, ''])));
    navigate('/');
  };

  // ----------------------------
  // Render
  // ----------------------------
  return (
    <div className={styles.Container}>
      <Typography variant="h4" className={styles.heading}>
        Add New Person
      </Typography>

      <Card
        sx={{
          maxWidth: { xs: '100%', sm: 500 },
          margin: '0 auto',
          padding: { xs: 1, sm: 2 },
        }}
      >
        <CardContent>
          <form className={styles.form} onSubmit={handleSubmit}>
            {fields.map((field) => (
              <div key={field} className={styles.formRow}>
                <TextField
                  id={field}
                  name={field}
                  label={capitalize(field)}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  size="small" // smaller input fields on mobile
                  value={formData[field]}
                  onChange={handleChange}
                  type={field === 'salary' ? 'number' : 'text'}
                />
              </div>
            ))}

            <Button
              variant="contained"
              type="submit"
              className={styles.button}
              sx={{
                marginTop: 2,
                paddingY: 1.2,
                fontWeight: 'bold',
                backgroundColor: 'rgb(178, 206, 206)',
                color: 'black',
                '&:hover': {
                  backgroundColor: 'blue',
                  color: 'white',
                },
              }}
            >
              Add Employee
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddEmployee;
