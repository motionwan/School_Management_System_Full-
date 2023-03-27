import axios from 'axios';
import { useFormik } from 'formik';
import React, { useContext } from 'react';
import { FaPlusCircle, FaSchool } from 'react-icons/fa';
import { Store } from 'react-notifications-component';
import { Link, useNavigate } from 'react-router-dom';
import AddView from '../../Components/AddViewComponent/AddView';
import { PrimaryButton } from '../../Components/Buttons/PrimaryButton';
import {
  ErrorContainer,
  ErrorMessage,
} from '../../Components/ErrorComponent/Error';
import TextInput from '../../Components/Input/Input';
import Layout from '../../Components/Layout/Layout';
import LocationLabel from '../../Components/LocationLabel/LocationLabel';
import TermSelector from '../../Components/TermSelector/TermSelector';
import AuthContext from '../../context/AuthContext/AuthContext';
import staffSettingsSchema from '../../formSchema/StaffSettingsSchema/StaffSettingSchema';
import { baseUrl } from '../../helpers/baseUrl';
import {
  FieldSet,
  Legend,
  Container,
  SingleFieldContainer,
  ButtonContainer,
} from './Settings.styles';

const Settings = () => {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const res = await axios.put(`${baseUrl}/staff/${auth?.userId}`, {
      zoomApiKey: values.zoomApiKey,
      zoomApiSecret: values.zoomApiSecret,
    });
    if (res) {
      Store.addNotification({
        title: 'Success!',
        message: 'School Updated successfully',
        type: 'success',
        insert: 'top',
        container: 'top-right',
        animationIn: ['animate__animated', 'animate__bounceIn'],
        animationOut: ['animate__animated', 'animate__bounceOut'],
        dismiss: {
          duration: 5000,
        },
      });
      navigate('/dashboard');
    }
  };

  const { values, errors, touched, handleBlur, handleSubmit, handleChange } =
    useFormik({
      initialValues: {
        zoomApiKey: auth?.zoomApiKey ? auth?.zoomApiKey : '',
        zoomApiSecret: auth?.zoomApiSecret ? auth?.zoomApiSecret : '',
      },
      onSubmit,
      validationSchema: staffSettingsSchema,
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
        <AddView></AddView>
        <form onSubmit={handleSubmit}>
          <FieldSet>
            <Legend>Zoom API Credentials</Legend>
            <Container>
              <SingleFieldContainer>
                <TextInput
                  label='Zoom API Key'
                  name='zoomApiKey'
                  value={values.zoomApiKey}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.zoomApiKey && errors.zoomApiKey && (
                  <ErrorContainer>
                    <ErrorMessage>{errors.zoomApiKey}</ErrorMessage>
                  </ErrorContainer>
                )}
              </SingleFieldContainer>
              <SingleFieldContainer>
                <TextInput
                  type='password'
                  label='Zoom API Secret'
                  name='zoomApiSecret'
                  value={values.zoomApiSecret}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.zoomApiSecret && errors.zoomApiSecret && (
                  <ErrorContainer>
                    <ErrorMessage>{errors.zoomApiSecret}</ErrorMessage>
                  </ErrorContainer>
                )}
              </SingleFieldContainer>
            </Container>
          </FieldSet>
          <ButtonContainer>
            <PrimaryButton label='Save Settings' type='submit' />
          </ButtonContainer>
        </form>
      </Layout>
    </div>
  );
};

export default Settings;
