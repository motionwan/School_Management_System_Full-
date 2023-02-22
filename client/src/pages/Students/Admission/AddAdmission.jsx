import React, { useContext, useState, useEffect } from 'react';
import AddView from '../../../Components/AddViewComponent/AddView';
import { PrimaryButton } from '../../../Components/Buttons/PrimaryButton';
import Layout from '../../../Components/Layout/Layout';
import LocationLabel from '../../../Components/LocationLabel/LocationLabel';
import TermSelector from '../../../Components/TermSelector/TermSelector';
import AuthContext from '../../../context/AuthContext/AuthContext';
import styled from 'styled-components';
import TextInput from '../../../Components/Input/Input';
import { useFormik } from 'formik';
import StudentRecord from '../../../formSchema/StudentRecord/StudentRecord';
import {
  ErrorContainer,
  ErrorMessage,
} from '../../../Components/ErrorComponent/Error';
import CustomSelect from '../../../Components/CustomSelect/CustomSelect';
import axios from 'axios';
import { baseUrl } from '../../../helpers/baseUrl';
import { Store } from 'react-notifications-component';
import { Link, useNavigate } from 'react-router-dom';
import Notification from '../../../Components/Notification/Notification';

const Container = styled.div`
  display: flex;
  width: 100%;
  min-height: 20rem;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  border: 1px solid #333;
`;
const InputContainer = styled.div`
  display: flex;
  width: 95%;
  margin: 20px 20px;
  padding: 10px;
  gap: 35px;

  @media (max-width: 900px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;
const InputWrapper = styled.div`
  width: 100%;
`;

const AddStudent = () => {
  const [classSchools, setClassSchools] = useState('[]');
  const [programs, setPrograms] = useState('[]');
  const [errorMessage, setErrorMessage] = useState('');
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  const bloodGroupOptions = [
    {
      label: 'O+',
      value: 'O+',
    },
    {
      label: 'A+',
      value: 'A+',
    },
    {
      label: 'B+',
      value: 'B+',
    },
    {
      label: 'AB+',
      value: 'AB+',
    },
    {
      label: 'A-',
      value: 'A-',
    },
    {
      label: 'B-',
      value: 'B-',
    },
    {
      label: 'O-',
      value: 'O-',
    },
    {
      label: 'AB-',
      value: 'AB-',
    },
  ];

  const handleError = (error) => {
    setErrorMessage(error);

    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
  };

  useEffect(() => {
    const arr = [];
    const getAllClassSchools = async () => {
      const res = await axios.get(`${baseUrl}/class_school`);

      res.data.forEach((classSchool) => {
        arr.push({
          label: classSchool?.classId?.label,
          value: classSchool?._id,
        });
      });
      setClassSchools(arr);
    };
    getAllClassSchools();
  }, []);

  const onSubmit = async (values) => {
    const data = new FormData();
    console.log(values);
    data.append('fullName', values.fullName);
    data.append('gender', values.gender);
    data.append('dateOfBirth', values.dateOfBirth);
    data.append('phoneNumber', values.phoneNumber);
    data.append('email', values.email);
    data.append('address', values.address);
    data.append('admissionDate', values.admissionDate);
    data.append('bloodGroup', values.bloodGroup);
    data.append('guardianName', values.guardianName);
    data.append('guardianPhoneNumber', values.guardianPhoneNumber);
    data.append('guardianOccupation', values.guardianOccupation);
    data.append('photoId', values.photoId);
    data.append('sectionId', values.sectionId);
    data.append('sessionId', values.sessionId);
    data.append('city', values.city);
    data.append('username', values.username);
    data.append('termId', auth?.currentTermId?._id);
    try {
      const res = await axios.post(`${baseUrl}/student_record`, data);
      if (res) {
        Store.addNotification({
          title: 'Success!',
          message: `An email has been sent to ${values.email} please click the link to activate your account`,
          type: 'success',
          insert: 'top',
          container: 'top-right',
          animationIn: ['animate__animated', 'animate__bounceIn'],
          animationOut: ['animate__animated', 'animate__bounceOut'],
          dismiss: {
            duration: 10000,
          },
        });
        navigate(`/client_student/${auth?.schoolId._id}`);
      }
    } catch (err) {
      handleError(err.response.data.error);
    }
  };

  const {
    values,
    errors,
    touched,
    handleSubmit,
    handleChange,
    handleBlur,
    setFieldValue,
  } = useFormik({
    initialValues: {
      fullName: '',
      gender: '',
      dateOfBirth: '',
      phoneNumber: '',
      email: '',
      address: '',
      admissionDate: '',
      bloodGroup: '',
      guardianName: '',
      guardianPhoneNumber: '',
      status: '',
      guardianOccupation: '',
      photoId: null,
      sectionId: '',
      classSchoolId: '',
      termId: '',
      city: '',
      healthInsurance: '',
      hometown: '',
      religion: '',
      username: '',
      allergies: '',
    },
    validationSchema: StudentRecord,
    onSubmit: onSubmit,
  });
  // fetch programs for the school
  useEffect(() => {
    if (values.classSchoolId) {
      const arr = [];
      const getAllClassPrograms = async () => {
        const res = await axios.get(
          `${baseUrl}/class_section/${values.classSchoolId}`
        );

        res.data.forEach((program) => {
          arr.push({
            label: program?.label,
            value: program?._id,
          });
        });
        setPrograms(arr);
      };
      getAllClassPrograms();
    }
  }, [values.classSchoolId]);

  console.log(values);

  return (
    <div>
      <Layout>
        <LocationLabel label={auth?.schoolId?.label.toUpperCase()}>
          <TermSelector />
        </LocationLabel>
        <AddView>
          <Link to={`/client_student/${auth?.schoolId._id}/students`}>
            <PrimaryButton label='View Students' />
          </Link>
        </AddView>
        <form onSubmit={handleSubmit}>
          <Container>
            <h2>Personal Information</h2>
            <InputContainer>
              <InputWrapper>
                <TextInput
                  label='Full Name'
                  name='fullName'
                  value={values.fullName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.fullName && errors.fullName ? (
                  <ErrorContainer>
                    <ErrorMessage>{errors.fullName}</ErrorMessage>
                  </ErrorContainer>
                ) : null}
              </InputWrapper>

              <InputWrapper>
                <TextInput
                  label='Gender'
                  name='gender'
                  value={values.gender}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.gender && errors.gender ? (
                  <ErrorContainer>
                    <ErrorMessage>{errors.gender}</ErrorMessage>
                  </ErrorContainer>
                ) : null}
              </InputWrapper>
              <InputWrapper>
                <TextInput
                  type='date'
                  label='Date Of Birth'
                  name='dateOfBirth'
                  value={values.dateOfBirth}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.dateOfBirth && errors.dateOfBirth ? (
                  <ErrorContainer>
                    <ErrorMessage>{errors.dateOfBirth}</ErrorMessage>
                  </ErrorContainer>
                ) : null}
              </InputWrapper>
            </InputContainer>

            <InputContainer>
              <InputWrapper>
                <TextInput
                  label='Religion'
                  name='religion'
                  value={values.religion}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </InputWrapper>
              <InputWrapper>
                <CustomSelect
                  options={bloodGroupOptions}
                  label='Blood group'
                  name='bloodGroup'
                  onChange={(e) => {
                    setFieldValue('bloodGroup', e.value);
                  }}
                />
              </InputWrapper>
              <InputWrapper>
                <TextInput
                  label='Address'
                  name='address'
                  value={values.address}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </InputWrapper>
            </InputContainer>

            <InputContainer>
              <InputWrapper>
                <TextInput
                  label='Phone'
                  name='phoneNumber'
                  value={values.phoneNumber}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.phoneNumber && errors.phoneNumber ? (
                  <ErrorContainer>
                    <ErrorMessage>{errors.phoneNumber}</ErrorMessage>
                  </ErrorContainer>
                ) : null}
              </InputWrapper>
              <InputWrapper>
                <TextInput
                  label='Email'
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name='email'
                />
                {touched.email && errors.email ? (
                  <ErrorContainer>
                    <ErrorMessage>{errors.email}</ErrorMessage>
                  </ErrorContainer>
                ) : null}
              </InputWrapper>
              <InputWrapper>
                <TextInput
                  label='Home town'
                  name='hometown'
                  value={values.hometown}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.hometown && errors.hometown ? (
                  <ErrorContainer>
                    <ErrorMessage>{errors.hometown}</ErrorMessage>
                  </ErrorContainer>
                ) : null}
              </InputWrapper>
            </InputContainer>

            <InputContainer>
              <InputWrapper>
                <TextInput
                  label='Current City'
                  name='city'
                  value={values.city}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.city && errors.city ? (
                  <ErrorContainer>
                    <ErrorMessage>{errors.city}</ErrorMessage>
                  </ErrorContainer>
                ) : null}
              </InputWrapper>
              <InputWrapper>
                <TextInput
                  label='Health Insurance Number'
                  name='healthInsurance'
                  value={values.healthInsurance}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.healthInsurance && errors.healthInsurance ? (
                  <ErrorContainer>
                    <ErrorMessage>{errors.healthInsurance}</ErrorMessage>
                  </ErrorContainer>
                ) : null}
              </InputWrapper>
              <InputWrapper>
                <TextInput
                  label='Allergies'
                  name='allergies'
                  value={values.allergies}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.allergies && errors.allergies ? (
                  <ErrorContainer>
                    <ErrorMessage>{errors.allergies}</ErrorMessage>
                  </ErrorContainer>
                ) : null}
              </InputWrapper>
            </InputContainer>
            <h3 style={{ margin: '80px 0' }}>Admission Information</h3>

            <InputContainer>
              <InputWrapper>
                <TextInput
                  type='date'
                  label='Admission Date'
                  name='admissionDate'
                  value={values.admissionDate}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.admissionDate && errors.admissionDate ? (
                  <ErrorContainer>
                    <ErrorMessage>{errors.admissionDate}</ErrorMessage>
                  </ErrorContainer>
                ) : null}
              </InputWrapper>
              <InputWrapper style={{ margin: '0 20px', width: '90%' }}>
                <CustomSelect
                  label='Class'
                  placeholder='class'
                  name='classSchoolId'
                  options={classSchools}
                  onChange={(e) => {
                    setFieldValue('classSchoolId', e.value);
                  }}
                />
                {touched.classSchoolId && errors.classSchoolId ? (
                  <ErrorContainer>
                    <ErrorMessage>{errors.classSchoolId}</ErrorMessage>
                  </ErrorContainer>
                ) : null}
              </InputWrapper>
              <InputWrapper style={{ margin: '0 10px', width: '90%' }}>
                <CustomSelect
                  label='Program'
                  placeholder='Program'
                  name='sectionId'
                  onChange={(e) => {
                    setFieldValue('sectionId', e.value);
                  }}
                  options={programs}
                />
                {touched.sectionId && errors.sectionId ? (
                  <ErrorContainer>
                    <ErrorMessage>{errors.sectionId}</ErrorMessage>
                  </ErrorContainer>
                ) : null}
              </InputWrapper>
            </InputContainer>

            <InputContainer>
              <InputWrapper style={{ maxWidth: '300px' }}>
                <TextInput
                  label='Profile Picture'
                  type='file'
                  name='photoId'
                  onChange={(event) => {
                    setFieldValue('photoId', event.currentTarget.files[0]);
                  }}
                  onBlur={handleBlur}
                />
              </InputWrapper>

              <InputWrapper style={{ maxWidth: '300px' }}>
                <TextInput
                  label='Username'
                  name='username'
                  value={values.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.username && errors.username ? (
                  <ErrorContainer>
                    <ErrorMessage>{errors.username}</ErrorMessage>
                  </ErrorContainer>
                ) : null}
              </InputWrapper>
            </InputContainer>
            <h3 style={{ margin: '80px 0' }}>Guardian Information</h3>

            <InputContainer>
              <InputWrapper>
                <TextInput
                  label={`Guardian's Full Name`}
                  name='guardianName'
                  value={values.guardianName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.guardianName && errors.guardianName ? (
                  <ErrorContainer>
                    <ErrorMessage>{errors.guardianName}</ErrorMessage>
                  </ErrorContainer>
                ) : null}
              </InputWrapper>
              <InputWrapper>
                <TextInput
                  label={`Guardian's Phone Number`}
                  name='guardianPhoneNumber'
                  value={values.guardianPhoneNumber}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.guardianPhoneNumber && errors.guardianPhoneNumber ? (
                  <ErrorContainer>
                    <ErrorMessage>{errors.guardianPhoneNumber}</ErrorMessage>
                  </ErrorContainer>
                ) : null}
              </InputWrapper>
              <InputWrapper>
                <TextInput
                  label={`Guardian's Occupation`}
                  name='guardianOccupation'
                  value={values.guardianOccupation}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.guardianOccupation && errors.guardianOccupation ? (
                  <ErrorContainer>
                    <ErrorMessage>{errors.guardianOccupation}</ErrorMessage>
                  </ErrorContainer>
                ) : null}
              </InputWrapper>
            </InputContainer>

            <div style={{ margin: '40px 0' }}>
              <PrimaryButton type='submit' label='Admit Student' />
            </div>
          </Container>
        </form>
        {errorMessage ? (
          <Notification type='error' message={errorMessage} />
        ) : null}
      </Layout>
    </div>
  );
};

export default AddStudent;
