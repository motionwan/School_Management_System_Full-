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
import TermSelector from '../../../Components/TermSelector/TermSelector';

const Subjects = () => {
  const [subjects, setSubjects] = useState([]);
  const [pageLoading, setPageLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [notification, setNotification] = useState('');
  const { currentData, auth } = useContext(AuthContext);
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
        const res = await axios.get(`${baseUrl}/subject`);
        setSubjects(res.data);
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
    { key: 'label', label: 'Subject Name' },
    { key: 'code', label: 'Subject Code' },
    { key: 'type', label: 'Subject Type' },
    { key: 'class', label: 'Class' },
    { key: 'teacher', label: 'Assign Teacher' },
  ];

  const handleDelete = async () => {
    setPageLoading(true);
    try {
      if (currentData) {
        const res = await axios.delete(
          `${baseUrl}/schools/${currentData?._id}`
        );
        if (res)
          setSubjects(subjects.filter((c) => c._id !== currentData?._id));
        setPageLoading(false);
        setNotification('Subject deleted successfully');
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
        navigate(`/school_management/subjects/${currentData?._id}/update`);
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
          <LocationLabel
            label={auth?.schoolId.label.toUpperCase()}
            icon={<FaSchool />}
          >
            <TermSelector />
          </LocationLabel>
          <AddView>
            <Link to={`/client_school/${auth.schoolId._id}/add_subjects `}>
              <PrimaryButton label='Add Subject' icon={<FaPlusCircle />} />
            </Link>
          </AddView>
          {errorMessage ? (
            <Notification message={errorMessage} type='error' />
          ) : null}
          {notification ? (
            <Notification message={notification} type='success' />
          ) : null}
          <div>
            {subjects.length < 1 ? (
              <h1>No Subject Data to display</h1>
            ) : (
              <DataTable
                data={subjects}
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

export default Subjects;
