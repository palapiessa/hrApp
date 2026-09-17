import PersonCard from './PersonCard';
import styles from './PersonList.module.css';
import { calculateWorkExperience } from '../utils/calculateWorkExperience';
import React, { useState, useEffect } from 'react';

const PersonList = ({ employees, updateEmployee }) => {
  const [employeeList, setEmployeeList] = useState(employees);

  useEffect(() => {
    setEmployeeList(employees);
  }, [employees]);

  const deleteEmployee = (id) => {
    setEmployeeList((prevList) => prevList.filter((emp) => emp.id !== id));
  };
  return (
    <div className={styles.listContainer}>
      {employeeList.map((employee) => (
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
