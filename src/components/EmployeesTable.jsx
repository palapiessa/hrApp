import React, { useEffect, useState } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { getAnimalEmoji } from '../utils/animalEmoji';
import useAxios from '../hooks/useAxios';

const EmployeesTable = () => {
  const axiosInstance = useAxios();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Fetch employees on mount
  useEffect(() => {
    axiosInstance
      .get('https://hrapp-bec7.onrender.com/employees')
      .then((res) => setData(res.data))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, []);
  if (loading) {
    return <Typography align="center">Loading employees...</Typography>;
  }
  if (error) {
    return (
      <Typography align="center" color="error">
        Error {error.message}
      </Typography>
    );
  }
  if (!data || data.length === 0) {
    return <Typography align="center">No data found!</Typography>;
  }
  return (
    <div>
      <Typography variant="h4" align="center" marginBottom={5}>
        All Employees
      </Typography>
      <div className="table-container">
        <TableContainer component={Paper} sx={{ boxShadow: 10 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: 'rgb(4, 92, 100)' }}>
                <TableCell
                  sx={{
                    border: '1px solid #ccc',
                    textAlign: 'center',
                    color: 'white',
                  }}
                >
                  ID
                </TableCell>
                <TableCell
                  sx={{
                    border: '1px solid #ccc',
                    textAlign: 'center',
                    color: 'white',
                  }}
                >
                  Name
                </TableCell>
                <TableCell
                  sx={{
                    border: '1px solid #ccc',
                    textAlign: 'center',
                    color: 'white',
                  }}
                >
                  Title
                </TableCell>
                <TableCell
                  sx={{
                    border: '1px solid #ccc',
                    textAlign: 'center',
                    color: 'white',
                  }}
                >
                  Salary
                </TableCell>
                <TableCell
                  sx={{
                    border: '1px solid #ccc',
                    textAlign: 'center',
                    color: 'white',
                  }}
                >
                  Phone
                </TableCell>
                <TableCell
                  sx={{
                    border: '1px solid #ccc',
                    textAlign: 'center',
                    color: 'white',
                  }}
                >
                  Email
                </TableCell>
                <TableCell
                  sx={{
                    border: '1px solid #ccc',
                    textAlign: 'center',
                    color: 'white',
                  }}
                >
                  Animal
                </TableCell>
                <TableCell
                  sx={{
                    border: '1px solid #ccc',
                    textAlign: 'center',
                    color: 'white',
                  }}
                >
                  Start Date
                </TableCell>
                <TableCell
                  sx={{
                    border: '1px solid #ccc',
                    textAlign: 'center',
                    color: 'white',
                  }}
                >
                  Location
                </TableCell>
                <TableCell
                  sx={{
                    border: '1px solid #ccc',
                    textAlign: 'center',
                    color: 'white',
                  }}
                >
                  Department
                </TableCell>
                <TableCell
                  sx={{
                    border: '1px solid #ccc',
                    textAlign: 'center',
                    color: 'white',
                  }}
                >
                  Skills
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((employee) => (
                <TableRow
                  key={employee.id}
                  sx={{ backgroundColor: 'rgb(237, 244, 244)' }}
                >
                  <TableCell align="center" sx={{ border: '1px solid #ccc' }}>
                    {employee.id}
                  </TableCell>
                  <TableCell align="center" sx={{ border: '1px solid #ccc' }}>
                    {employee.name}
                  </TableCell>
                  <TableCell align="center" sx={{ border: '1px solid #ccc' }}>
                    {employee.title}
                  </TableCell>
                  <TableCell align="center" sx={{ border: '1px solid #ccc' }}>
                    {employee.salary}
                  </TableCell>
                  <TableCell align="center" sx={{ border: '1px solid #ccc' }}>
                    {employee.phone}
                  </TableCell>
                  <TableCell align="center" sx={{ border: '1px solid #ccc' }}>
                    {employee.email}
                  </TableCell>
                  <TableCell align="center">
                    {getAnimalEmoji(employee.animal)}
                  </TableCell>
                  <TableCell align="center" sx={{ border: '1px solid #ccc' }}>
                    {employee.startDate}
                  </TableCell>
                  <TableCell align="center" sx={{ border: '1px solid #ccc' }}>
                    {employee.location}
                  </TableCell>
                  <TableCell align="center" sx={{ border: '1px solid #ccc' }}>
                    {employee.department}
                  </TableCell>

                  <TableCell align="center" sx={{ border: '1px solid #ccc' }}>
                    {employee.skills && Array.isArray(employee.skills)
                      ? employee.skills.join(', ')
                      : '-'}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};
export default EmployeesTable;
