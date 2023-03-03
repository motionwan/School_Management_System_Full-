import axios from 'axios';
import React, { useContext, useState, useEffect } from 'react';
import { FaPlusCircle, FaSchool } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import AddView from '../../../Components/AddViewComponent/AddView';
import { PrimaryButton } from '../../../Components/Buttons/PrimaryButton';
import Layout from '../../../Components/Layout/Layout';
import LocationLabel from '../../../Components/LocationLabel/LocationLabel';
import Spinner from '../../../Components/Spinner/Spinner';
import DataTable from '../../../Components/Table/Table';
import TermSelector from '../../../Components/TermSelector/TermSelector';
import AuthContext from '../../../context/AuthContext/AuthContext';
import { baseUrl } from '../../../helpers/baseUrl';

const Admins = () => {
  const { auth } = useContext(AuthContext);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);

  // console.log(roles);

  useEffect(() => {
    const getAllStaff = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${baseUrl}/staff`);
        setRoles(res.data);
        setLoading(false);
      } catch (err) {}
    };
    getAllStaff();
  }, []);

  const columns = [
    { key: 'fullName', label: 'Full Name' },
    { key: 'username', label: 'Username' },
    { key: 'email', label: 'Email' },
    { key: 'verify', label: 'Verified' },
    { key: 'active', label: 'Status' },
    { key: 'emergencyContactName', label: 'Emergency Contact Name' },
    { key: 'emergencyContactNumber', label: 'Emergency Contact Number' },
  ];

  return (
    <div>
      <Layout>
        <LocationLabel
          label={auth?.schoolId.label.toUpperCase()}
          icon={<FaSchool />}
        >
          <TermSelector />
        </LocationLabel>
        <AddView>
          <Link to={`/staff/${auth.schoolId._id}/add_admin `}>
            <PrimaryButton label='Add Admin' icon={<FaPlusCircle />} />
          </Link>
        </AddView>
        <DataTable data={roles} columns={columns} />
        {loading && <Spinner />}
      </Layout>
    </div>
  );
};

export default Admins;
