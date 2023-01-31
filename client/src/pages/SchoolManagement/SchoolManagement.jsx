import React, { useEffect, useState } from 'react';
import axios from 'axios';
//import CardComponent from '../../Components/DashboardCard/DashboardCard';
import Layout from '../../Components/Layout/Layout';
import { baseUrl } from '../../helpers/baseUrl';
import Spinner from '../../Components/Spinner/Spinner';
import Notification from '../../Components/Notification/Notification';
import {
  Card,
  CardContainer,
  CardContent,
  CardHeader,
  CardText,
} from '../../Components/DashboardCard/DashboardCard';

const SchoolManagement = () => {
  const [schools, setSchools] = useState([]);
  const [pageLoading, setPageLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

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
        console.log(res.data);
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
          <div>
            {schools.map((school) => {
              return (
                <CardContainer key={school._id}>
                  <Card>
                    <CardContent>
                      <CardHeader>{`Name: ${school.label.toUpperCase()}`}</CardHeader>
                      <CardText>{`Phone: ${school.phone}`}</CardText>
                      <CardText>{`Email: ${school.phone}`}</CardText>
                      <CardText>{`Status: ${
                        school.status ? 'ACTIVE' : 'INACTIVE'
                      }`}</CardText>
                    </CardContent>
                  </Card>
                </CardContainer>
              );
            })}
          </div>
        </Layout>
      )}
    </div>
  );
};

export default SchoolManagement;
