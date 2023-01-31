import React, { useContext, useState } from 'react';
import TextInput from '../../../Components/Input/Input';
import Layout from '../../../Components/Layout/Layout';
import {
  MainContainer,
  Label,
  ColumnContainer,
} from '../../../Components/FormComponents/FormComponents';
import { PrimaryButton } from '../../../Components/Buttons/PrimaryButton';
import { HiOutlinePencil } from 'react-icons/hi';
import { useFormik } from 'formik';
import classSchema from '../../../formSchema/Classes/ClassSchema';
import {
  ErrorContainer,
  ErrorMessage,
} from '../../../Components/ErrorComponent/Error';
import { baseUrl } from '../../../helpers/baseUrl';
import axios from 'axios';
import Notification from '../../../Components/Notification/Notification';
import Spinner from '../../../Components/Spinner/Spinner';
import { Store } from 'react-notifications-component';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../../context/AuthContext/AuthContext';

const UpdateClass = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { currentData } = useContext(AuthContext);

  const onSubmit = async (values) => {
    setLoading(true);
    try {
      const res = await axios.put(`${baseUrl}/classes/${currentData?._id}`, {
        label: values.label,
      });
      if (res.status === 200) {
        Store.addNotification({
          title: 'Success!',
          message: 'Class updated successfully',
          type: 'success',
          insert: 'top',
          container: 'top-right',
          animationIn: ['animate__animated', 'animate__bounceIn'],
          animationOut: ['animate__animated', 'animate__bounceOut'],
          dismiss: {
            duration: 5000,
          },
        });
        navigate('/school_management/classes');
      }
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
      setErrorMessage(err.response.data.error);
    }
  };

  const { values, errors, touched, handleSubmit, handleBlur, handleChange } =
    useFormik({
      initialValues: {
        label: currentData?.label,
      },
      validationSchema: classSchema,
      onSubmit: onSubmit,
    });

  return (
    <Layout>
      {loading ? (
        <>
          <Spinner />
        </>
      ) : (
        <>
          {errorMessage ? (
            <>
              <Notification type='error' message={errorMessage} />
            </>
          ) : null}
          <form onSubmit={handleSubmit}>
            <MainContainer>
              <Label>Update Class</Label>
              <ColumnContainer>
                <TextInput
                  name='label'
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.label}
                  label='Class Name'
                />
                {touched.label && errors.label ? (
                  <ErrorContainer>
                    <ErrorMessage>{errors.label}</ErrorMessage>
                  </ErrorContainer>
                ) : null}
              </ColumnContainer>
              <PrimaryButton
                type='submit'
                label='Update Class'
                icon={<HiOutlinePencil />}
              />
            </MainContainer>
          </form>
        </>
      )}
    </Layout>
  );
};

export default UpdateClass;
