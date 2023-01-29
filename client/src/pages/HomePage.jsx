import React, { useContext, useEffect, useState } from 'react';
import DataTable from '../Components/Table/Table';
import axios from 'axios';
import AuthContext from '../context/AuthContext/AuthContext';
const HomePage = () => {
  const { currentData } = useContext(AuthContext);

  const columns = [
    { key: 'label', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone' },
    { key: 'address', label: 'Address' },
    { key: 'status', label: 'City' },
  ];
  const [data, setData] = useState([]);
  useEffect(() => {
    const getAllSchools = async () => {
      const res = await axios.get('http://localhost:3001/schools');
      setData(res.data);
    };
    getAllSchools();
  }, []);
  const handleDelete = async () => {
    const res = await axios.delete(
      `http://localhost:3001/schools/${currentData[0]._id}`
    );
    if (res) setData(data.filter((c) => c._id !== currentData[0]._id));
  };
  return (
    <div>
      {data.length < 1 ? (
        <h1>No Data to Display</h1>
      ) : (
        <>
          {' '}
          <DataTable data={data} columns={columns} onDelete={handleDelete} />
        </>
      )}
    </div>
  );
};

export default HomePage;
