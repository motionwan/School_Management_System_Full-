import React, { useContext, useState } from 'react';
import axios from 'axios';
import Layout from '../../../Components/Layout/Layout';
import { baseUrl } from '../../../helpers/baseUrl';
import Spinner from '../../../Components/Spinner/Spinner';
import AuthContext from '../../../context/AuthContext/AuthContext';
import LocationLabel from '../../../Components/LocationLabel/LocationLabel';
import { FaPlusCircle, FaSchool } from 'react-icons/fa';
import AddView from '../../../Components/AddViewComponent/AddView';
import { PrimaryButton } from '../../../Components/Buttons/PrimaryButton';
import { Link, useNavigate } from 'react-router-dom';
import TermSelector from '../../../Components/TermSelector/TermSelector';
import styled from 'styled-components';
import { useFormik } from 'formik';
import {
  ErrorContainer,
  ErrorMessage,
} from '../../../Components/ErrorComponent/Error';
import TextInput from '../../../Components/Input/Input';
import TextAreaInput from '../../../Components/TextAreaInput/TextAreaInput';
import Notification from '../../../Components/Notification/Notification';
import { Store } from 'react-notifications-component';
import { parseISO } from 'date-fns';

const InputContainer = styled.div`
  width: 100%;
  border: 1px solid gray;
  min-height: 140px;
  padding: 30px;

  @media (max-width: 900px) {
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    justify-content: center;
    margin: 50px 0;
  }
`;
const InputWrapper = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 50px;

  @media (max-width: 900px) {
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    justify-content: center;
    margin: 50px 0;
  }
`;

const UpdateExeat = () => {
  const [pageLoading, setPageLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { auth, currentData } = useContext(AuthContext);
  const navigate = useNavigate();

  // handle errors with this function
  const handleError = (error) => {
    setErrorMessage(error);

    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
  };

  const onSubmit = async (values) => {
    setPageLoading(true);
    try {
      const res = await axios.put(`${baseUrl}/exeat/${currentData?._id}`, {
        reason: values.reason,
        startDate: values.startDate,
        endDate: values.endDate,
        isApproved: values.isApproved,
        studentRecordId: values.studentRecordId,
        classSchoolId: values.classSchoolId,
        // eslint-disable-next-line eqeqeq
        approvedBy: values.isApproved == 1 ? auth?.userId : null,
      });
      if (res) {
        Store.addNotification({
          title: 'Success!',
          message: 'Exeat Created successfully',
          type: 'success',
          insert: 'top',
          container: 'top-right',
          animationIn: ['animate__animated', 'animate__bounceIn'],
          animationOut: ['animate__animated', 'animate__bounceOut'],
          dismiss: {
            duration: 5000,
          },
        });
        navigate(`/client_academic/${auth?.schoolId?._id}/exeat`);
      }

      setPageLoading(false);
    } catch (err) {
      handleError(err.response.data.error);
      setPageLoading(false);
    }
  };

  const { values, errors, handleChange, touched, handleSubmit } = useFormik({
    initialValues: {
      startDate: parseISO(currentData?.startDate),
      endDate: parseISO(currentData?.endDate),
      reason: currentData?.reason,
      sectionId: currentData?.sectionId,
      isApproved: currentData?.isApproved,
      studentRecordId: currentData?.studentRecordId,
      classSchoolId: currentData?.classSchoolId,
    },
    onSubmit: onSubmit,
  });

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
            <Link to={`/client_academic/${auth?.schoolId?._id}/exeat`}>
              <PrimaryButton
                label='View Issued Exeat'
                icon={<FaPlusCircle />}
              />
            </Link>
          </AddView>
          <form onSubmit={handleSubmit}>
            <InputContainer>
              <InputWrapper>
                <div style={{ width: '100%' }}>
                  <TextInput
                    type='date'
                    label='Start Date'
                    value={values.startDate}
                    placeholder='Start Date'
                    name='startDate'
                    onChange={handleChange}
                  />
                  {errors.startDate && touched.startDate ? (
                    <ErrorContainer>
                      <ErrorMessage>{errors.startDate}</ErrorMessage>
                    </ErrorContainer>
                  ) : null}
                </div>
                <div style={{ width: '100%' }}>
                  <TextInput
                    type='date'
                    label='End Date'
                    placeholder='End Date'
                    name='endDate'
                    value={values.endDate}
                    onChange={handleChange}
                  />
                  {errors.endDate && touched.endDate ? (
                    <ErrorContainer>
                      <ErrorMessage>{errors.endDate}</ErrorMessage>
                    </ErrorContainer>
                  ) : null}
                </div>
              </InputWrapper>
              <InputWrapper>
                <div
                  style={{
                    width: '100%',
                  }}
                >
                  <TextAreaInput
                    label='Reason'
                    placeholder='Select Class'
                    name='reason'
                    value={values.reason}
                    onChange={handleChange}
                  />
                  {errors.reason && touched.reason ? (
                    <ErrorContainer>
                      <ErrorMessage>{errors.reason}</ErrorMessage>
                    </ErrorContainer>
                  ) : null}
                </div>
                <div>
                  <TextInput
                    type='radio'
                    label='Approved'
                    placeholder='Select Section'
                    name='isApproved'
                    value={1}
                    onChange={handleChange}
                    // eslint-disable-next-line eqeqeq
                    checked={values.isApproved == 1}
                  />
                  {errors.isApproved && touched.isApproved ? (
                    <ErrorContainer>
                      <ErrorMessage>{errors.isApproved}</ErrorMessage>
                    </ErrorContainer>
                  ) : null}
                </div>
                <div>
                  <TextInput
                    type='radio'
                    label='Unapproved'
                    placeholder='Select Section'
                    name='isApproved'
                    onChange={handleChange}
                    value={0}
                    // eslint-disable-next-line eqeqeq
                    checked={values.isApproved == 0}
                  />
                  {errors.isApproved && touched.isApproved ? (
                    <ErrorContainer>
                      <ErrorMessage>{errors.isApproved}</ErrorMessage>
                    </ErrorContainer>
                  ) : null}
                </div>
              </InputWrapper>
            </InputContainer>
            <div
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '10px 0',
              }}
            >
              {' '}
              <PrimaryButton label='Add Exeat' type='submit' />
            </div>
          </form>
          <div></div>
          <div
            style={{
              width: '100%',
              display: 'flex',
              alignItem: 'center',
              justifyContent: 'center',
              margin: '5px',
            }}
          ></div>
        </Layout>
      )}
      {errorMessage ? (
        <Notification message={errorMessage} type='error' />
      ) : null}
    </div>
  );
};

export default UpdateExeat;
