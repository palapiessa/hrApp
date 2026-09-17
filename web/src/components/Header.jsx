import styles from './Header.module.css';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { Button, IconButton, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu'; // ✅ Added MenuIcon

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className={styles.header}>
      <Typography variant="h4" className={styles.title}>
        HR Management System
      </Typography>

      {/* ✅ Hamburger icon for mobile */}
      <IconButton
        className={styles.hamburger}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <MenuIcon />
      </IconButton>

      <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ''}`}>
        {' '}
        {/* ✅ Added navOpen toggle */}
        <ul className={styles.navList}>
          <li>
            <Button
              component={Link}
              to="/"
              variant="contained"
              className={styles.navLink}
              onClick={() => setMenuOpen(false)} // ✅ Close menu on link click
            >
              Home
            </Button>
          </li>
          <li>
            <Button
              component={Link}
              to="/add"
              className={styles.navLink}
              variant="contained"
              onClick={() => setMenuOpen(false)} // ✅ Close menu on link click
            >
              Add Employee
            </Button>
          </li>
          <li>
            <Button
              component={Link}
              to="/table"
              className={styles.navLink}
              variant="contained"
              onClick={() => setMenuOpen(false)} // ✅ Close menu on link click
            >
              Employee Table
            </Button>
          </li>
          <li>
            <Button
              component={Link}
              to="/about"
              className={styles.navLink}
              variant="contained"
              onClick={() => setMenuOpen(false)} // ✅ Close menu on link click
            >
              About
            </Button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
