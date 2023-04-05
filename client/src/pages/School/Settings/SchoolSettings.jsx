import axios from 'axios';
import { useFormik } from 'formik';
import React, { useContext } from 'react';
import { FaSchool } from 'react-icons/fa';
import AddView from '../../../Components/AddViewComponent/AddView';
import { PrimaryButton } from '../../../Components/Buttons/PrimaryButton';
import {
  Label,
  MainContainer,
} from '../../../Components/FormComponents/FormComponents';
import TextInput from '../../../Components/Input/Input';
import Layout from '../../../Components/Layout/Layout';
import LocationLabel from '../../../Components/LocationLabel/LocationLabel';
import TermSelector from '../../../Components/TermSelector/TermSelector';
import AuthContext from '../../../context/AuthContext/AuthContext';
import schoolSettingSchema from '../../../formSchema/SchoolSettings/SchoolSettings';
import { baseUrl } from '../../../helpers/baseUrl';
import {
  ButtonContainer,
  SingleFieldContainer,
} from '../../UserSettings/Settings.styles';

const SchoolSettings = () => {
  const { auth } = useContext(AuthContext);

  const onSubmit = async (values) => {
    const data = new FormData();
    data.append('email', values.email);
    data.append('hubtelClientId', values.hubtelClientId);
    data.append('hubtelClientSecret', values.hubtelClientSecret);
    data.append('schoolCrest', values.schoolCrest);
    try {
      const res = await axios.put(
        `${baseUrl}/schools/${auth?.schoolId?._id}`,
        data
      );
      if (res) {
        console.log(res);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const { values, handleChange, handleBlur, setFieldValue, handleSubmit } =
    useFormik({
      initialValues: {
        email: auth?.schoolId?.email ? auth?.schoolId?.email : '',
        hubtelClientId: auth?.schoolId?.hubtelClientId
          ? auth?.schoolId?.hubtelClientId
          : '',
        hubtelClientSecret: auth?.schoolId?.hubtelClientSecret
          ? auth?.schoolId?.hubtelClientSecret
          : '',
        schoolCrest: auth?.schoolId?.schoolCrest
          ? auth?.schoolId?.schoolCrest
          : null,
      },
      validationSchema: schoolSettingSchema,
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
        <AddView>Send Notification</AddView>

        <form onSubmit={handleSubmit}>
          <MainContainer>
            <Label>School Settings</Label>
            <TextInput
              name='email'
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              label={`School's email`}
            />
            <TextInput
              name='hubtelClientId'
              value={values.hubtelClientId}
              onChange={handleChange}
              onBlur={handleBlur}
              label={`Hubtel client id`}
            />

            <TextInput
              name='hubtelClientSecret'
              value={values.hubtelClientSecret}
              onChange={handleChange}
              onBlur={handleBlur}
              label={`Hubtel client secret`}
            />
            <SingleFieldContainer>
              <TextInput
                type='file'
                name='schoolCrest'
                onChange={(event) => {
                  setFieldValue('schoolCrest', event.currentTarget.files[0]);
                }}
                onBlur={handleBlur}
                label={`School's Crest/Badge/Logo`}
              />
            </SingleFieldContainer>
            <ButtonContainer>
              <PrimaryButton type='submit' label='Save Settings' />
            </ButtonContainer>
          </MainContainer>
        </form>
      </Layout>
    </div>
  );
};

export default SchoolSettings;
