import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../../../Components/Layout/Layout';
import { baseUrl } from '../../../helpers/baseUrl';
import Spinner from '../../../Components/Spinner/Spinner';
import Notification from '../../../Components/Notification/Notification';
import DataTable from '../../../Components/Table/Table';
import AuthContext from '../../../context/AuthContext/AuthContext';
import LocationLabel from '../../../Components/LocationLabel/LocationLabel';
import { FaPlusCircle, FaSchool } from 'react-icons/fa';
import AddView from '../../../Components/AddViewComponent/AddView';
import { PrimaryButton } from '../../../Components/Buttons/PrimaryButton';
import { Link, useNavigate } from 'react-router-dom';

const Schools = () => {
  const [schools, setSchools] = useState([]);
  const [pageLoading, setPageLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [notification, setNotification] = useState('');
  const { currentData } = useContext(AuthContext);
  const navigate = useNavigate();

  // handle errors with this function
  const handleError = (error) => {
    setErrorMessage(error);

    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
  };

  useEffect(() => {
    const getAllSchools = async () => {
      setPageLoading(true);
      try {
        const res = await axios.get(`${baseUrl}/schools`);
        setSchools(res.data);
        setPageLoading(false);
      } catch (err) {
        console.log(err);
        if (!err.response.ok) setErrorMessage('Network error');
        handleError(err.response.data.error);
        setPageLoading(false);
      }
    };
    getAllSchools();
  }, []);

  const columns = [
    { key: 'label', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone' },
    { key: 'address', label: 'Address' },
  ];

  const handleDelete = async () => {
    setPageLoading(true);
    try {
      if (currentData) {
        const res = await axios.delete(
          `${baseUrl}/schools/${currentData?._id}`
        );
        if (res) setSchools(schools.filter((c) => c._id !== currentData?._id));
        setPageLoading(false);
        setNotification('School deleted successfully');
      }
    } catch (err) {
      console.error(err);
      setErrorMessage(err.response.data.error);
      setPageLoading(false);
    }
  };

  const handleEdit = () => {
    try {
      if (currentData) {
        navigate(`/school_management/schools/${currentData?._id}/update`);
      }
    } catch (err) {
      console.error(err);
      handleError(err.response.data.error);
      setPageLoading(false);
    }
  };

  return (
    <div>
      {pageLoading ? (
        <>
          <Spinner />
        </>
      ) : (
        <Layout>
          <LocationLabel label='Schools' icon={<FaSchool />}></LocationLabel>
          <AddView>
            <Link to='/school_management/schools/add'>
              <PrimaryButton label='Add School' icon={<FaPlusCircle />} />
            </Link>
          </AddView>
          {errorMessage ? (
            <Notification message={errorMessage} type='error' />
          ) : null}
          {notification ? (
            <Notification message={notification} type='success' />
          ) : null}
          <div>
            {schools.length < 1 ? (
              <h1>No School Data to display</h1>
            ) : (
              <DataTable
                data={schools}
                columns={columns}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            )}
          </div>
        </Layout>
      )}
    </div>
  );
};

export default Schools;
