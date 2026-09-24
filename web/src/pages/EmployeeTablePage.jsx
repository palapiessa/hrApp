import EmployeesTable from '../components/EmployeesTable';
import React, { useState } from 'react';

const EmployeeTablePage = () => {
  const [surname, setSurname] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    setSearchTerm(surname);
  };

  return (
    <div>
      <div>
        <label htmlFor="surname">Surname</label>
        <input
          id="surname"
          type="text"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
        />
        <button type="button" onClick={handleSearch}>
          Search
        </button>
      </div>
      <EmployeesTable searchTerm={searchTerm} />
    </div>
  );
};
export default EmployeeTablePage;
