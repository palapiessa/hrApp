import { Card, CardContent, Typography } from '@mui/material';
import styles from './ErrorPage.module.css';

const ErrorPage = () => {
  return (
    <div className={styles.container}>
      <Card sx={{ padding: 3, textAlign: 'center' }}>
        <CardContent>
          <Typography variant="h2" className={styles.title}>
            404
          </Typography>
          <Typography variant="h2" className={styles.subtitle}>
            Page Not Found
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};
export default ErrorPage;
