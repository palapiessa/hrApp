import PersonCard from './PersonCard';
import styles from './PersonList.module.css';
import { calculateWorkExperience } from '../utils/calculateWorkExperience';
import React from 'react';

const PersonList = ({ employees, updateEmployee, deleteEmployee }) => {
  return (
    <div className={styles.listContainer}>
      {employees.map((employee) => (
        <PersonCard
          key={employee.id}
          {...employee}
          workExperience={calculateWorkExperience(employee.startDate)}
          updateEmployee={updateEmployee}
          deleteEmployee={deleteEmployee}
        />
      ))}
    </div>
  );
};

export default PersonList;
