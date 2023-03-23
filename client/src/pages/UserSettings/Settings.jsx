import axios from 'axios';
import { useFormik } from 'formik';
import React, { useContext } from 'react';
import { FaPlusCircle, FaSchool } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import AddView from '../../Components/AddViewComponent/AddView';
import { PrimaryButton } from '../../Components/Buttons/PrimaryButton';
import TextInput from '../../Components/Input/Input';
import Layout from '../../Components/Layout/Layout';
import LocationLabel from '../../Components/LocationLabel/LocationLabel';
import TermSelector from '../../Components/TermSelector/TermSelector';
import AuthContext from '../../context/AuthContext/AuthContext';
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

  const onSubmit = async (values) => {
    const res = await axios.post(`${baseUrl}/settings`, {
      zoomApiKey: values.zoomApiKey,
      zoomApiSecret: values.zoomApiSecret,
    });
    if (res) {
      console.log('first');
    }
  };

  const {
    values,
    errors,
    touched,
    handleError,
    handleTouched,
    handleSubmit,
    handleChange,
  } = useFormik({
    initialValues: {
      zoomApiKey: auth?.settings?.zoomApiKey ? auth?.settings?.zoomApiKey : '',
      zoomApiSecret: auth?.settings?.zoomApiSecret
        ? auth?.settings?.zoomApiSecret
        : '',
    },
    onSubmit,
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
                <TextInput label='Zoom API Key' />
              </SingleFieldContainer>
              <SingleFieldContainer>
                <TextInput label='Zoom API Secret' />
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
