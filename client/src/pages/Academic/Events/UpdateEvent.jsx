/* eslint-disable eqeqeq */
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
import Notification from '../../../Components/Notification/Notification';
import TextAreaInput from '../../../Components/TextAreaInput/TextAreaInput';
import { Store } from 'react-notifications-component';
import DateInput from '../../../Components/DateInput/DateInput';
import EventSchema from '../../../formSchema/EventSchema/EventSchema';
import { format } from 'date-fns';

const InputContainer = styled.div`
  width: 100%;
  border: 1px solid gray;
  min-height: 140px;
  display: flex;
  gap: 20px;
  padding: 10px;

  @media (max-width: 900px) {
    flex-direction: column;
    width: 100%;
    align-items: center;
    justify-content: center;
    margin: 50px 0;
  }
`;

const SecondaryInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (max-width: 900px) {
    flex-direction: column;
    width: 100%;
    align-items: center;
    justify-content: center;
    margin: 50px 0;
  }
`;

const UpdateEvent = () => {
  const [pageLoading, setPageLoading] = useState(false);
  //const [attendanceData, setAttendanceData] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  // handle errors with this function
  const handleError = (error) => {
    setErrorMessage(error);

    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
  };

  const onSubmit = async (values) => {
    const data = new FormData();

    data.append('title', values.title);
    data.append('description', values.description);
    data.append('eventDate', format(values.eventDate, 'do-MMM-yyyy'));
    data.append('status', values.status);
    data.append('attachment', values.attachment);
    data.append('addedBy', auth?.userId);
    data.append('termId', auth?.currentTermId._id);
    data.append('schoolId', auth?.schoolId?._id);
    try {
      setPageLoading(true);
      const res = await axios.post(`${baseUrl}/event`, data);
      if (res) {
        Store.addNotification({
          title: 'Success!',
          message: 'Event Updated successfully',
          type: 'success',
          insert: 'top',
          container: 'top-right',
          animationIn: ['animate__animated', 'animate__bounceIn'],
          animationOut: ['animate__animated', 'animate__bounceOut'],
          dismiss: {
            duration: 5000,
          },
        });
        navigate(`/client_academic/${auth?.schoolId?._id}/events`);
      }
      setPageLoading(false);
    } catch (err) {
      console.error(err);
      handleError(err.response.data.error);
      setPageLoading(false);
    }
  };

  const {
    values,
    errors,
    handleBlur,
    touched,
    setFieldValue,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      title: '',
      description: '',
      eventDate: Date.now(),
      status: 1,
      attachment: null,
    },
    validationSchema: EventSchema,
    onSubmit: onSubmit,
  });

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
          <Link to={`/client_academic/events `}>
            <PrimaryButton label='View Events' icon={<FaPlusCircle />} />
          </Link>
        </AddView>
        <form onSubmit={handleSubmit}>
          <InputContainer>
            <div
              style={{
                width: '50%',
                margin: '20px 0',
              }}
            >
              <TextInput
                label='Event Title'
                name='title'
                placeholder='e.g Graduation ceremony'
                value={values.label}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.title && touched.title ? (
                <ErrorContainer>
                  <ErrorMessage>{errors.title}</ErrorMessage>
                </ErrorContainer>
              ) : null}
            </div>
            <div
              style={{
                width: '40%',
                margin: '10px 20px',
              }}
            >
              <DateInput
                label='Event Date'
                name='eventDate'
                selected={values.eventDate}
                dateFormat='dd-MMM-yyyy'
                onChange={(e) => {
                  setFieldValue('eventDate', e);
                }}
              />
              {errors.eventDate && touched.eventDate ? (
                <ErrorContainer>
                  <ErrorMessage>{errors.eventDate}</ErrorMessage>
                </ErrorContainer>
              ) : null}
            </div>
          </InputContainer>
          <SecondaryInputContainer>
            <div
              style={{
                width: '100%',
                margin: '20px 0',
              }}
            >
              <TextAreaInput
                label='Event Body'
                name='description'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.description}
              />
              {errors.description && touched.description ? (
                <ErrorContainer>
                  <ErrorMessage>{errors.description}</ErrorMessage>
                </ErrorContainer>
              ) : null}
            </div>
          </SecondaryInputContainer>

          <InputContainer>
            <div
              style={{
                width: '60%',
                margin: '40px 0',
                display: 'flex',
                padding: '20px',
                justifyContent: 'flex-start',
              }}
            >
              <TextInput
                type='file'
                label='Image'
                name='attachment'
                onBlur={handleBlur}
                onChange={(e) => {
                  setFieldValue('attachment', e.currentTarget.files[0]);
                }}
              />
            </div>
            {errors.attachment && touched.attachment ? (
              <ErrorContainer>
                <ErrorMessage>{errors.attachment}</ErrorMessage>
              </ErrorContainer>
            ) : null}
            <div>
              {/* <label
                style={{
                  marginTop: '0px ',
                  display: 'flex',
                  padding: '20px',
                  justifyContent: 'flex-start',
                }}
              >
                Status
              </label> */}
              <div
                style={{
                  margin: '40px 0',
                  display: 'flex',
                  padding: '20px',
                  justifyContent: 'flex-start',
                }}
              >
                <TextInput
                  label='Active'
                  type='radio'
                  name='status'
                  value={1}
                  checked={values.status == 1}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                <div
                  style={{
                    margin: '0 40px',
                  }}
                >
                  <TextInput
                    label='Inactive'
                    type='radio'
                    name='status'
                    value={0}
                    checked={values.status == 0}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                </div>
                {errors.attachment && touched.attachment ? (
                  <ErrorContainer>
                    <ErrorMessage>{errors.attachment}</ErrorMessage>
                  </ErrorContainer>
                ) : null}
              </div>
              {errors.status && touched.status ? (
                <ErrorContainer>
                  <ErrorMessage>{errors.status}</ErrorMessage>
                </ErrorContainer>
              ) : null}
            </div>
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
            <PrimaryButton label='Add Event' type='submit' />
          </div>
        </form>
        {pageLoading && <Spinner />}
        {errorMessage && <Notification message={errorMessage} type='error' />}
      </Layout>
    </div>
  );
};

export default UpdateEvent;
