import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import TextInput from '../../../Components/Input/Input';
import Layout from '../../../Components/Layout/Layout';
import { format } from 'date-fns';
import {
  MainContainer,
  Label,
  FormContainer,
  ColumnContainer,
} from '../../../Components/FormComponents/FormComponents';
import { PrimaryButton } from '../../../Components/Buttons/PrimaryButton';
import { FaPlusCircle } from 'react-icons/fa';
import { useFormik } from 'formik';
import schoolSchema from '../../../formSchema/Schools/AddSchools';
import {
  ErrorContainer,
  ErrorMessage,
} from '../../../Components/ErrorComponent/Error';
import { baseUrl } from '../../../helpers/baseUrl';
import axios from 'axios';
import Notification from '../../../Components/Notification/Notification';
import Spinner from '../../../Components/Spinner/Spinner';
//import RadioButton from '../../../Components/RadioButton/RadioButton';
import AuthContext from '../../../context/AuthContext/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Store } from 'react-notifications-component';

const Preview = styled.div`
  width: 100%;
  height: 3rem;
  display: flex;
  align-items: center;
  padding: 0 40px;
  background-color: ${({ theme }) => theme.bg3};
`;
const generateNumber = (prefix, baseNumber, padding) => {
  const numberString = (baseNumber + 1).toString().padStart(padding, '0');
  return prefix + numberString;
};

const AddSchool = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { currentData } = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    setLoading(true);
    try {
      const res = await axios.put(`${baseUrl}/schools/${currentData?._id}`, {
        label: values.label,
        phone: values.phone,
        address: values.address,
        email: values.email,
        status: values.status,
        enrollmentBaseNumber: values.enrollmentBaseNumber,
        enrollmentPrefix: values.enrollmentPrefix,
        enrollmentPadding: values.enrollmentPadding,
        description: values.description,
        updatedAt: format(Date.now(), 'do-MMM-yyyy'),
      });
      if (res.status === 200) {
        Store.addNotification({
          title: 'Success!',
          message: 'School added successfully',
          type: 'success',
          insert: 'top',
          container: 'top-right',
          animationIn: ['animate__animated', 'animate__bounceIn'],
          animationOut: ['animate__animated', 'animate__bounceOut'],
          dismiss: {
            duration: 5000,
          },
        });
        navigate('/school_management/schools');
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
        phone: currentData?.phone,
        address: currentData?.address,
        email: currentData?.email,
        status: currentData?.status,
        enrollmentBaseNumber: currentData?.enrollmentBaseNumber,
        enrollmentPrefix: currentData?.enrollmentPrefix,
        enrollmentPadding: currentData?.enrollmentPadding,
        description: currentData?.description,
      },
      validationSchema: schoolSchema,
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
              <Label>Update School</Label>
              <FormContainer>
                <ColumnContainer>
                  <TextInput
                    name='label'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.label}
                    label='School Name'
                  />
                  {touched.label && errors.label ? (
                    <ErrorContainer>
                      <ErrorMessage>{errors.label}</ErrorMessage>
                    </ErrorContainer>
                  ) : null}
                </ColumnContainer>
                <ColumnContainer>
                  <TextInput
                    name='address'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.address}
                    label='Address(GPS)'
                  />
                  {touched.address && errors.address ? (
                    <ErrorContainer>
                      <ErrorMessage>{errors.address}</ErrorMessage>
                    </ErrorContainer>
                  ) : null}
                </ColumnContainer>
              </FormContainer>
              <FormContainer>
                <ColumnContainer>
                  <TextInput
                    name='phone'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.phone}
                    label='Phone Number'
                  />
                  {touched.phone && errors.phone ? (
                    <ErrorContainer>
                      <ErrorMessage>{errors.phone}</ErrorMessage>
                    </ErrorContainer>
                  ) : null}
                </ColumnContainer>
                <ColumnContainer>
                  <TextInput
                    name='description'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.description}
                    label='Description'
                  />
                  {touched.description && errors.description ? (
                    <ErrorContainer>
                      <ErrorMessage>{errors.description}</ErrorMessage>
                    </ErrorContainer>
                  ) : null}
                </ColumnContainer>
              </FormContainer>
              <FormContainer>
                <ColumnContainer>
                  <TextInput
                    name='email'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.email}
                    label='Email'
                  />
                  {touched.email && errors.email ? (
                    <ErrorContainer>
                      <ErrorMessage>{errors.email}</ErrorMessage>
                    </ErrorContainer>
                  ) : null}
                </ColumnContainer>
                <FormContainer>
                  <TextInput
                    type='radio'
                    name='status'
                    onChange={handleChange}
                    label='Active'
                    value={1}
                    // eslint-disable-next-line eqeqeq
                    checked={values.status == 1}
                  />
                  <TextInput
                    type='radio'
                    name='status'
                    label='Inactive'
                    onChange={handleChange}
                    value={0}
                    // eslint-disable-next-line eqeqeq
                    checked={values.status == 0}
                  />
                  {touched.status && errors.status ? (
                    <ErrorContainer>
                      <ErrorMessage>{errors.status}</ErrorMessage>
                    </ErrorContainer>
                  ) : null}
                </FormContainer>
              </FormContainer>
              <FormContainer>
                <ColumnContainer>
                  <TextInput
                    name='enrollmentPrefix'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.enrollmentPrefix}
                    label='Enrollment Prefix'
                  />
                  {touched.enrollmentPrefix && errors.enrollmentPrefix ? (
                    <ErrorContainer>
                      <ErrorMessage>{errors.enrollmentPrefix}</ErrorMessage>
                    </ErrorContainer>
                  ) : null}
                </ColumnContainer>
              </FormContainer>

              <FormContainer>
                <ColumnContainer>
                  <TextInput
                    name='enrollmentBaseNumber'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.enrollmentBaseNumber}
                    label='Enrollment Base Number'
                  />
                  {touched.enrollmentBaseNumber &&
                  errors.enrollmentBaseNumber ? (
                    <ErrorContainer>
                      <ErrorMessage>{errors.enrollmentBaseNumber}</ErrorMessage>
                    </ErrorContainer>
                  ) : null}
                </ColumnContainer>
              </FormContainer>

              <FormContainer>
                <ColumnContainer>
                  <TextInput
                    name='enrollmentPadding'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.enrollmentPadding}
                    label='Enrollment Padding'
                  />
                  {touched.enrollmentPadding && errors.enrollmentPadding ? (
                    <ErrorContainer>
                      <ErrorMessage>{errors.enrollmentPadding}</ErrorMessage>
                    </ErrorContainer>
                  ) : null}
                </ColumnContainer>
              </FormContainer>
              <Preview>
                <h4>
                  Admission Number preview:{' '}
                  {generateNumber(
                    values.enrollmentPrefix,
                    values.enrollmentBaseNumber,
                    values.enrollmentPadding
                  )}
                </h4>
              </Preview>
              <FormContainer>
                <PrimaryButton
                  type='submit'
                  label='Update School'
                  icon={<FaPlusCircle />}
                />
              </FormContainer>
            </MainContainer>
          </form>
        </>
      )}
    </Layout>
  );
};

export default AddSchool;
