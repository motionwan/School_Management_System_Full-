import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
//import CardComponent from '../../Components/DashboardCard/DashboardCard';
import Layout from '../../../Components/Layout/Layout';
import { baseUrl } from '../../../helpers/baseUrl';
import Spinner from '../../../Components/Spinner/Spinner';
import Notification from '../../../Components/Notification/Notification';

import styled from 'styled-components';
import AuthContext from '../../../context/AuthContext/AuthContext';
import LocationLabel from '../../../Components/LocationLabel/LocationLabel';
import TermSelector from '../../../Components/TermSelector/TermSelector';
import AddView from '../../../Components/AddViewComponent/AddView';
import { PrimaryButton } from '../../../Components/Buttons/PrimaryButton';
import { Link } from 'react-router-dom';

const MyLink = styled.a`
  text-decoration: none;
  color: inherit;
`;

const SchoolDashboard = () => {
  const [schools, setSchools] = useState([]);
  const [pageLoading, setPageLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { auth } = useContext(AuthContext);

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
        handleError(err.response.data.error);
        setPageLoading(false);
      }
    };
    getAllSchools();
  }, []);

  return (
    <div>
      {pageLoading ? (
        <>
          <Spinner />
        </>
      ) : (
        <Layout>
          {errorMessage ? (
            <Notification message={errorMessage} type='error' />
          ) : null}
          <LocationLabel label={auth?.schoolId?.label.toUpperCase()}>
            <TermSelector />
          </LocationLabel>
          <AddView>
            <Link to={`/client_academic/${auth?.schoolId._id}/assign_classes`}>
              <PrimaryButton label='Assign Classes' />
            </Link>
            <Link to='/assign_admin'>
              <PrimaryButton label='Assign Admins' />
            </Link>
          </AddView>
        </Layout>
      )}
    </div>
  );
};

export default SchoolDashboard;
