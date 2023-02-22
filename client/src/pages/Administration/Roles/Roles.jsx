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

const Roles = () => {
  const { auth } = useContext(AuthContext);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);

  // console.log(roles);

  useEffect(() => {
    const getAllRoles = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${baseUrl}/role`);
        setRoles(res.data);
        setLoading(false);
      } catch (err) {}
    };
    getAllRoles();
  }, []);

  const columns = [
    { key: 'name', label: 'Role Name' },
    // {key:'name', label:'Role Name',},
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
          <Link to={`/staff/${auth.schoolId._id}/add_role `}>
            <PrimaryButton label='Add Role' icon={<FaPlusCircle />} />
          </Link>
        </AddView>
        <DataTable data={roles} columns={columns} />
        {loading && <Spinner />}
      </Layout>
    </div>
  );
};

export default Roles;
