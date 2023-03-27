import axios from 'axios';
import { useFormik } from 'formik';
import React, { useContext } from 'react';
import { FaPlusCircle, FaSchool } from 'react-icons/fa';
import { Store } from 'react-notifications-component';
import { Link, useNavigate } from 'react-router-dom';
import AddView from '../../../Components/AddViewComponent/AddView';
import { PrimaryButton } from '../../../Components/Buttons/PrimaryButton';
import {
  ErrorContainer,
  ErrorMessage,
} from '../../../Components/ErrorComponent/Error';
import {
  Label,
  MainContainer,
} from '../../../Components/FormComponents/FormComponents';
import TextInput from '../../../Components/Input/Input';
import Layout from '../../../Components/Layout/Layout';
import LocationLabel from '../../../Components/LocationLabel/LocationLabel';
import TermSelector from '../../../Components/TermSelector/TermSelector';
import AuthContext from '../../../context/AuthContext/AuthContext';
import onlineClassSchema from '../../../formSchema/OnlineClassesSchema/OnlineClassesSchema';
import { baseUrl } from '../../../helpers/baseUrl';
import { ButtonContainer } from '../../UserSettings/Settings.styles';

const AddOnlineClasses = () => {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    try {
      const res = await axios.post(`${baseUrl}/online-class`, {
        topic: values.topic,
        start_time: values.startTime,
        duration: values.duration,
        password: values.password,
        apiKey: auth?.zoomApiKey,
        apiSecret: auth?.zoomApiSecret,
      });
      if (res) {
        Store.addNotification({
          title: 'Success!',
          message: 'Class Scheduled successfully',
          type: 'success',
          insert: 'top',
          container: 'top-right',
          animationIn: ['animate__animated', 'animate__bounceIn'],
          animationOut: ['animate__animated', 'animate__bounceOut'],
          dismiss: {
            duration: 5000,
          },
        });
        navigate('/client_academic/online_classes');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const { values, errors, touched, handleChange, handleSubmit, handleBlur } =
    useFormik({
      initialValues: {
        startTime: '',
        password: '',
        topic: '',
        duration: '',
      },
      onSubmit,
      validationSchema: onlineClassSchema,
    });
  console.log(values);
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
          <Link to={`/client_academic/add-online-classes `}>
            <PrimaryButton
              label='Create An Online Class'
              icon={<FaPlusCircle />}
            />
          </Link>
        </AddView>
        <form onSubmit={handleSubmit}>
          <MainContainer>
            <Label>Schedule Online Class</Label>
            <div style={{ width: '100%' }}>
              <TextInput
                label='Topic'
                name='topic'
                value={values.topic}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.topic && touched.topic && (
                <ErrorContainer>
                  <ErrorMessage>{errors.topic}</ErrorMessage>
                </ErrorContainer>
              )}
            </div>

            <div style={{ width: '100%' }}>
              <TextInput
                type='time'
                label='Start Time'
                name='startTime'
                value={values.startTime}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.topic && touched.topic && (
                <ErrorContainer>
                  <ErrorMessage>{errors.topic}</ErrorMessage>
                </ErrorContainer>
              )}
            </div>
            <div style={{ width: '100%' }}>
              <TextInput
                label='Duration(min)'
                placeholder='e.g 120'
                name='duration'
                value={values.duration}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.topic && touched.topic && (
                <ErrorContainer>
                  <ErrorMessage>{errors.topic}</ErrorMessage>
                </ErrorContainer>
              )}
            </div>
            <div style={{ width: '100%' }}>
              <TextInput
                label='Password'
                name='password'
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.topic && touched.topic && (
                <ErrorContainer>
                  <ErrorMessage>{errors.topic}</ErrorMessage>
                </ErrorContainer>
              )}
            </div>
            <ButtonContainer>
              <PrimaryButton label='Schedule Class' />
            </ButtonContainer>
          </MainContainer>
        </form>
      </Layout>
    </div>
  );
};

export default AddOnlineClasses;
