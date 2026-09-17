import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import Layout from './Layout';
import PersonList from './components/PersonList';
import About from './pages/About';
import AddEmployee from './pages/AddEmployee';
import ErrorPage from './pages/ErrorPage';
import useAxios from './hooks/useAxios';
import EmployeesTable from './components/EmployeesTable';
import EmployeeTablePage from './pages/EmployeeTablePage';
import { API_URL } from './config';
function App() {
  // ----------------------------
  // State
  // ----------------------------
  const [employees, setEmployees] = useState([]); //Employee state
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    salary: '',
    phone: '',
    email: '',
    animal: '',
    startDate: '',
    location: '',
    department: '',
    skills: '',
  });

  // ----------------------------
  // Helper functions
  // ----------------------------
  // Reset the form
  const resetForm = () => {
    setFormData({
      name: '',
      title: '',
      salary: '',
      phone: '',
      email: '',
      animal: '',
      startDate: '',
      location: '',
      department: '',
      skills: '',
    });
  };

  // Update one employee in the list
  const updateEmployee = (updatedEmployee) => {
    setEmployees((prev) =>
      prev.map((emp) => (emp.id === updatedEmployee.id ? updatedEmployee : emp))
    );
  };

  const deleteEmployee = (id) => {
    setEmployees((prev) => prev.filter((employee) => employee.id !== id));
  };

  const { get, post } = useAxios();

  useEffect(() => {
    get(`${API_URL}/employees`).then((response) => {
      setEmployees(response.data);
    });
  }, []);

  // ----------------------------
  // Event handlers
  // ----------------------------
  // Add new employee
  const onAddEmployee = () => {
    post(`${API_URL}/employees`, {
      id: (employees.length + 1).toString(),
      ...formData,
      skills: formData.skills.split(',').map((skill) => skill.trim()),
    })
      .then((response) => {
        // Add the new employee returned from server to local state
        setEmployees([...employees, response.data]);
        resetForm(); // Reset form after successful POST

        alert('Employee added successfully!');
      })
      .catch((error) => {
        console.error(
          'Error adding employee:',
          error.response.data || error.message
        );
      });
  };
  // ----------------------------
  // Render
  // ----------------------------
  return (
    <Router>
      <Routes>
        {/* Layout wraps all pages (Header, Footer, your container, etc.) */}
        <Route path="/" element={<Layout />}>
          {/* Home page */}
          <Route
            index
            element={
              <PersonList
                employees={employees}
                updateEmployee={updateEmployee}
                deleteEmployee={deleteEmployee}
              />
            }
          />

          {/* About page */}
          <Route path="about" element={<About />} />

          {/* Add Employee page */}
          <Route
            path="add"
            element={
              <AddEmployee
                formData={formData}
                setFormData={setFormData}
                onAddEmployee={onAddEmployee}
              />
            }
          />
          {/* New Emplyee Table Page */}
          <Route path="table" element={<EmployeeTablePage />} />
          {/* Wildcard route for all other paths */}
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </Router>
  );
}
export default App;
