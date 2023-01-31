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
  Container,
} from '../../Components/DashboardCard/DashboardCard';
import styled from 'styled-components';

const MyLink = styled.a`
  text-decoration: none;
  color: inherit;
`;

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

  const overrideActiveSchool = async (id) => {
    await axios.post(`http://localhost:3000/active`, {
      label: id,
      name: 'bmb',
    });
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
          <Container>
            {schools.map((school) => {
              return (
                <CardContainer key={school._id}>
                  <MyLink
                    key={school._id}
                    href={`/client_school/${school._id}`}
                  >
                    <Card onClick={() => overrideActiveSchool(school._id)}>
                      <CardContent>
                        <CardHeader>{`Name: ${school.label.toUpperCase()}`}</CardHeader>
                        <CardText>{`Phone: ${school.phone}`}</CardText>
                        <CardText>{`Email: ${school.phone}`}</CardText>
                        <CardText>{`Status: ${
                          school.status ? 'ACTIVE' : 'INACTIVE'
                        }`}</CardText>
                      </CardContent>
                    </Card>
                  </MyLink>
                </CardContainer>
              );
            })}
          </Container>
        </Layout>
      )}
    </div>
  );
};

export default SchoolManagement;
