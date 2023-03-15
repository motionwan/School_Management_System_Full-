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
import NoticeSchema from '../../../formSchema/NoticeSchema/NoticeSchema';

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

const AddNotice = () => {
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

    data.append('topic', values.topic);
    data.append('description', values.description);
    data.append('attachment', values.attachment);
    data.append('addedBy', auth?.userId);
    data.append('termId', auth?.currentTermId._id);
    data.append('schoolId', auth?.schoolId?._id);
    try {
      setPageLoading(true);
      const res = await axios.post(`${baseUrl}/notice`, data);
      if (res) {
        Store.addNotification({
          title: 'Success!',
          message: 'Homework uploaded successfully',
          type: 'success',
          insert: 'top',
          container: 'top-right',
          animationIn: ['animate__animated', 'animate__bounceIn'],
          animationOut: ['animate__animated', 'animate__bounceOut'],
          dismiss: {
            duration: 5000,
          },
        });
        navigate(`/client_academic/noticeboard`);
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
      topic: '',
      description: '',
      attachment: null,
    },
    validationSchema: NoticeSchema,
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
          <Link to={`/client_academic/noticeboard `}>
            <PrimaryButton label='View Notices' icon={<FaPlusCircle />} />
          </Link>
        </AddView>
        <form onSubmit={handleSubmit}>
          <SecondaryInputContainer>
            <div
              style={{
                width: '100%',
                margin: '20px 0',
              }}
            >
              <TextInput
                label='Topic'
                name='topic'
                value={values.label}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.topic && touched.topic ? (
                <ErrorContainer>
                  <ErrorMessage>{errors.topic}</ErrorMessage>
                </ErrorContainer>
              ) : null}
            </div>

            <div
              style={{
                width: '100%',
                margin: '20px 0',
              }}
            >
              <TextAreaInput
                label='Notice Body'
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

            <div
              style={{
                width: '100%',
                margin: '20px 0',
              }}
            >
              <TextInput
                label='Attachment'
                type='file'
                name='attachment'
                onBlur={handleBlur}
                onChange={(e) => {
                  setFieldValue('attachment', e.currentTarget.files[0]);
                }}
                // value={values.attachment}
              />
              {errors.attachment && touched.attachment ? (
                <ErrorContainer>
                  <ErrorMessage>{errors.attachment}</ErrorMessage>
                </ErrorContainer>
              ) : null}
            </div>
          </SecondaryInputContainer>
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
            <PrimaryButton label='Add Notice' type='submit' />
          </div>
        </form>
        {pageLoading && <Spinner />}
        {errorMessage && <Notification message={errorMessage} type='error' />}
      </Layout>
    </div>
  );
};

export default AddNotice;
