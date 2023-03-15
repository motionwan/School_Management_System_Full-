import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { FaPlusCircle, FaSchool } from 'react-icons/fa';
import { Store } from 'react-notifications-component';
import { Link, useNavigate } from 'react-router-dom';
import AddView from '../../../Components/AddViewComponent/AddView';
import { PrimaryButton } from '../../../Components/Buttons/PrimaryButton';
import Layout from '../../../Components/Layout/Layout';
import LocationLabel from '../../../Components/LocationLabel/LocationLabel';
import Notification from '../../../Components/Notification/Notification';
import Spinner from '../../../Components/Spinner/Spinner';
import DataTable from '../../../Components/Table/Table';
import TermSelector from '../../../Components/TermSelector/TermSelector';
import AuthContext from '../../../context/AuthContext/AuthContext';
import { baseUrl } from '../../../helpers/baseUrl';

const StudyMaterials = () => {
  const [pageLoading, setPageLoading] = useState(false);
  const [studyMaterials, setStudyMaterials] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  // const [notification, setNotification] = useState('');
  const { auth, currentData } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleError = (error) => {
    setErrorMessage(error);

    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
  };

  const handleDelete = async () => {
    setPageLoading(true);
    try {
      if (currentData) {
        const res = await axios.delete(
          `${baseUrl}/class_school_study_materials/${currentData?._id}`
        );
        if (res)
          setStudyMaterials(
            studyMaterials.filter((c) => c._id !== currentData?._id)
          );
        setPageLoading(false);
        Store.addNotification({
          title: 'Success!',
          message: 'Learning Material deleted successfully',
          type: 'success',
          insert: 'top',
          container: 'top-right',
          animationIn: ['animate__animated', 'animate__bounceIn'],
          animationOut: ['animate__animated', 'animate__bounceOut'],
          dismiss: {
            duration: 5000,
          },
        });
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
        navigate(
          `/client_academic/${auth?.schoolId?._id}/update_study_materials`
        );
      }
    } catch (err) {
      console.error(err);
      handleError(err.response.data.error);
      setPageLoading(false);
    }
  };

  useEffect(() => {
    try {
      setPageLoading(true);
      const getStudyMaterials = async () => {
        const res = await axios.get(
          `${baseUrl}/class_school_study_materials/${auth?.currentTermId._id}`
        );
        setStudyMaterials(res.data);
      };
      getStudyMaterials();
      setPageLoading(false);
    } catch (err) {
      handleError(err.response.data.error);
      setPageLoading(false);
    }
  }, [auth]);

  const columns = [
    { key: 'title', label: 'Title' },
    { key: 'class', label: 'Class' },
    { key: 'section', label: 'Course' },
    { key: 'subject', label: 'Subject' },
    { key: 'createdAt', label: 'Added On' },
    { key: 'addedBy', label: 'Added By' },
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
          <Link to={`/client_academic/add_study_materials `}>
            <PrimaryButton label='Add Study Material' icon={<FaPlusCircle />} />
          </Link>
        </AddView>
        {studyMaterials < 1 ? (
          <h4>No Study Materials Uploaded yet</h4>
        ) : (
          <>
            {pageLoading ? (
              <Spinner />
            ) : (
              <>
                <DataTable
                  columns={columns}
                  data={studyMaterials}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                />
              </>
            )}
          </>
        )}
        {errorMessage && <Notification message={errorMessage} type='error' />}
      </Layout>
    </div>
  );
};

export default StudyMaterials;
