import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
import { useFormik } from 'formik';
import ClassSectionSchema from '../../../formSchema/SectionSchema/SectionSchema';
import axios from 'axios';
import { baseUrl } from '../../../helpers/baseUrl';
import { HiOutlinePencil } from 'react-icons/hi';
import {
  ErrorContainer,
  ErrorMessage,
} from '../../../Components/ErrorComponent/Error';
import Notification from '../../../Components/Notification/Notification';
import { Store } from 'react-notifications-component';
import Spinner from '../../../Components/Spinner/Spinner';

const UpdateSection = () => {
  const navigate = useNavigate();
  const { auth, currentData } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState('');
  const [pageLoading, setPageLoading] = useState(false);

  const onSubmit = async () => {
    setPageLoading(true);
    try {
      const res = await axios.put(
        `${baseUrl}/class_section/${currentData._id}`,
        {
          label: values.label,
          classSchoolId: currentData?._id._id,
        }
      );
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
        navigate(`/client_academic/${auth?.schoolId?._id}/class_sections`);
      }
      setPageLoading(false);
    } catch (err) {
      console.error(err);
      handleError(err.response.data.error);
      setPageLoading(false);
    }
  };

  const handleError = (error) => {
    setErrorMessage(error);

    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
  };

  const { values, errors, touched, handleSubmit, handleChange, handleBlur } =
    useFormik({
      initialValues: {
        label: currentData?.label,
      },
      validationSchema: ClassSectionSchema,
      onSubmit: onSubmit,
    });

  return (
    <Layout>
      <LocationLabel label={auth?.schoolId?.label.toUpperCase()}>
        <TermSelector />
      </LocationLabel>
      <AddView>
        <Link to={`/client_academic/${auth?.schoolId?._id}/class_sections`}>
          <PrimaryButton label='View Classes' />
        </Link>
      </AddView>
      {pageLoading ? (
        <>
          <Spinner />
        </>
      ) : (
        <form onSubmit={handleSubmit}>
          <MainContainer>
            <Label>Edit Section</Label>
            <TextInput
              label='label'
              name='label'
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.label}
            />
            <>
              {errors.label && touched.label ? (
                <ErrorContainer>
                  <ErrorMessage>{errors.label}</ErrorMessage>
                </ErrorContainer>
              ) : null}
            </>
            <PrimaryButton
              type='submit'
              icon={<HiOutlinePencil />}
              label='Update Section'
            />
          </MainContainer>
        </form>
      )}

      {errorMessage ? (
        <>
          <Notification message={errorMessage} type='error' />
        </>
      ) : null}
    </Layout>
  );
};

export default UpdateSection;
