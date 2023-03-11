import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { baseUrl } from '../../helpers/baseUrl';
import Notification from '../Notification/Notification';
import styled from 'styled-components';
import AuthContext from '../../context/AuthContext/AuthContext';
import CustomSelect from '../CustomSelect/CustomSelect';

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
  const { auth } = useContext(AuthContext);
  const [terms, setTerms] = useState([]);
  const [notification, setNotification] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedTerm, setSelectedTerm] = useState({
    label: auth?.currentTermId?.label || '',
    value: auth?.currentTermId?._id || '',
  });

  useEffect(() => {
    const getAllTerms = async () => {
      try {
        const arr = [];
        const res = await axios.get(`${baseUrl}/term`);
        res.data.forEach((data) =>
          arr.push({
            label: data.label,
            value: data._id,
          })
        );
        setTerms(arr);
      } catch (err) {
        console.error(err);
        handleError(err);
      }
    };
    getAllTerms();
  }, []);

  const handleChange = async (e) => {
    try {
      setSelectedTerm({ label: e?.label, value: e?.value });
      const res = await axios.post(`${baseUrl}/settings`, {
        currentTermId: e?.value,
        bmb: 1,
      });
      if (res.status === 200) {
        setNotification('Term changed successfully');
        handleNotification('Term changed successfully');
        window.location.reload();
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
      <CustomSelect
        options={terms}
        value={selectedTerm}
        isSearchable={false}
        onChange={(e) => handleChange(e)}
      />
    </Container>
  );
};

export default TermSelector;
