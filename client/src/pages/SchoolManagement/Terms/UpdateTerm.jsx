import React, { useContext, useState } from 'react';
import TextInput from '../../../Components/Input/Input';
import Layout from '../../../Components/Layout/Layout';
import {
  MainContainer,
  Label,
  FormContainer,
  ColumnContainer,
} from '../../../Components/FormComponents/FormComponents';
import { PrimaryButton } from '../../../Components/Buttons/PrimaryButton';
import { useFormik } from 'formik';
import TermSchema from '../../../formSchema/Terms/TermSchema';
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
import { format, parseISO } from 'date-fns';
import { HiOutlinePencil } from 'react-icons/hi';
import AuthContext from '../../../context/AuthContext/AuthContext';

const UpdateTerm = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { currentData } = useContext(AuthContext);

  const onSubmit = async (values) => {
    setLoading(true);
    try {
      const res = await axios.put(`${baseUrl}/term/${currentData._id}`, {
        label: values.label,
        startDate: format(parseISO(values.startDate), 'yyyy-MMMM-do'),
        endDate: format(parseISO(values.endDate), 'yyyy-MMMM-do'),
      });
      if (res.status === 200) {
        Store.addNotification({
          title: 'Success!',
          message: 'Term updated successfully',
          type: 'success',
          insert: 'top',
          container: 'top-right',
          animationIn: ['animate__animated', 'animate__bounceIn'],
          animationOut: ['animate__animated', 'animate__bounceOut'],
          dismiss: {
            duration: 5000,
          },
        });
        navigate('/school_management/terms');
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
        label: currentData.label,
        startDate: parseISO(currentData.startDate),
        endDate: parseISO(currentData.endDate),
      },
      validationSchema: TermSchema,
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
              <Label>Update Term/Semester/Session</Label>

              <FormContainer>
                <ColumnContainer>
                  <TextInput
                    name='label'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.label}
                    label='Label'
                  />
                  {touched.label && errors.label ? (
                    <ErrorContainer>
                      <ErrorMessage>{errors.label}</ErrorMessage>
                    </ErrorContainer>
                  ) : null}
                </ColumnContainer>
              </FormContainer>

              <FormContainer>
                <ColumnContainer>
                  <TextInput
                    type='Date'
                    name='startDate'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.startDate}
                    label='Start Date'
                  />
                  {touched.startDate && errors.startDate ? (
                    <ErrorContainer>
                      <ErrorMessage>{errors.startDate}</ErrorMessage>
                    </ErrorContainer>
                  ) : null}
                </ColumnContainer>
              </FormContainer>

              <FormContainer>
                <ColumnContainer>
                  <TextInput
                    type='date'
                    name='endDate'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.endDate}
                    label='End Date'
                  />
                  {touched.endDate && errors.endDate ? (
                    <ErrorContainer>
                      <ErrorMessage>{errors.endDate}</ErrorMessage>
                    </ErrorContainer>
                  ) : null}
                </ColumnContainer>
              </FormContainer>

              <FormContainer>
                <PrimaryButton
                  type='submit'
                  label='Update Term'
                  icon={<HiOutlinePencil />}
                />
              </FormContainer>
            </MainContainer>
          </form>
        </>
      )}
    </Layout>
  );
};

export default UpdateTerm;
