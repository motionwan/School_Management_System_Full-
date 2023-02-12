import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { baseUrl } from '../../helpers/baseUrl';
import Notification from '../Notification/Notification';
import Select from 'react-select';
import styled from 'styled-components';
import AuthContext from '../../context/AuthContext/AuthContext';

// styles
const Container = styled.div`
  display: flex;
  width: 100%;
  padding: 10px;
  justify-content: center;
  align-items: center;
  @media (max-width: 868px) {
    flex-direction: column;
    margin-top: -35px;
    padding: -5px;
  }
`;
const Heading = styled.h3`
  padding: 10px;
`;

const TermSelector = () => {
  const [terms, setTerms] = useState([]);
  const [notification, setNotification] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedTerm, setSelectedTerm] = useState({ label: '', value: '' });
  const { auth } = useContext(AuthContext);
  const termOptions = [];
  terms.forEach((term) => {
    termOptions.push({ label: term.label, value: term._id });
  });
  //console.log(selectedTerm);
  useEffect(() => {
    const getAllTerms = async () => {
      const res = await axios.get(`${baseUrl}/term`);
      setTerms(res.data);
      setSelectedTerm({
        label: auth?.currentTermId?.label,
        value: auth?.currentTermId?._id,
      });
    };
    getAllTerms();
  }, [auth.currentTermId._id, auth]);

  const handleChange = async (e) => {
    try {
      //e.preventDefault();
      setSelectedTerm({ label: e.label, value: e.value });
      const res = await axios.post(`${baseUrl}/settings`, {
        currentTermId: e.value,
        bmb: 1,
      });
      if (res.status === 200) {
        setNotification('Term changed successfully');
        handleNotification('Term changed successfully');
      }
    } catch (err) {
      console.error(err);
      handleError(err);
    }
  };
  const handleError = (error) => {
    setErrorMessage(error);

    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
  };

  const handleNotification = (error) => {
    setNotification(error);

    setTimeout(() => {
      setNotification(null);
    }, 10000);
  };

  return (
    <Container>
      {errorMessage ? (
        <Notification message={errorMessage} type='error' />
      ) : null}
      {notification ? (
        <Notification message={notification} type='success' />
      ) : null}
      <Heading>Current Term/Semester:</Heading>
      <Select
        options={termOptions}
        value={selectedTerm}
        isSearchable={false}
        onChange={(e) => handleChange(e)}
      />
    </Container>
  );
};

export default TermSelector;
