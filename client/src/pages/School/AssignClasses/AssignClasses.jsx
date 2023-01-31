import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Layout from '../../../Components/Layout/Layout';
import DataTable from '../../../Components/Table/Table';
import { baseUrl } from '../../../helpers/baseUrl';

const AssignClasses = () => {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const getAllClasses = async () => {
      const res = await axios.get(`${baseUrl}/classes`);
      setClasses(res.data);
    };
    getAllClasses();
  }, []);

  const columns = [{ key: 'label', label: 'Class Name' }];
  return (
    <div>
      <Layout>
        <DataTable columns={columns} data={classes} />
      </Layout>
    </div>
  );
};

export default AssignClasses;
