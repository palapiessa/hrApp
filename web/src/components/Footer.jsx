import { Typography } from '@mui/material';
import styles from './Footer.module.css';
import React from 'react';
import Link from '@mui/material/Link';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Typography variant="body2" component="p">
        © 2025 WP25K.{' '}
        <Link href="#privacy" underline="hover" className={styles.authorLink}>
          Privacy Policy
        </Link>
      </Typography>

      <Typography variant="body2" component="p">
        Made by{' '}
        <Typography
          component="a"
          href="https://github.com/BitaYeganeh"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.authorLink}
        >
          Bita Yeganeh
        </Typography>
      </Typography>
    </footer>
  );
};

export default Footer;
