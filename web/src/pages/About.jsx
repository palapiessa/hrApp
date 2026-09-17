import React from 'react';
import styles from './About.module.css';
import { Button } from '@mui/material';

function About() {
  return (
    <div className={styles.aboutContainer}>
      <h2>About us</h2>
      <p>
        Welcome to the <strong>HR Employee Management App</strong> — a simple,
        modern tool designed to help HR teams manage employee data efficiently.
      </p>

      <h2>This app allows you to:</h2>
      <ul>
        <li>View a list of employees and their detailed information</li>
        <li>Track employee experience and milestones</li>
        <li>Get automatic reminders for probation and recognition reviews</li>
        <li>Add new employees easily through a user-friendly form</li>
      </ul>
      <p>
        Built with <strong>React</strong>, this app demonstrates how to manage
        dynamic data and component-based design in a real-world HR setting.
      </p>
      <Button variant="outlined">Mui Button</Button>
    </div>
  );
}

export default About;
