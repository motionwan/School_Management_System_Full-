import React, { useContext, useState } from 'react';
import { PrimaryButton } from '../../Components/Buttons/PrimaryButton';
import AuthContext from '../../context/AuthContext/AuthContext';
import styled from 'styled-components';
import TextInput from '../../Components/Input/Input';
import { useFormik } from 'formik';
import StaffSignUpSchema from '../../formSchema/AddStaff/StaffSignUp';
import {
  ErrorContainer,
  ErrorMessage,
} from '../../Components/ErrorComponent/Error';
import CustomSelect from '../../Components/CustomSelect/CustomSelect';
import axios from 'axios';
import { baseUrl } from '../../helpers/baseUrl';
import { Store } from 'react-notifications-component';
import { useNavigate, useParams } from 'react-router-dom';
import Notification from '../../Components/Notification/Notification';
import DateInput from '../../Components/DateInput/DateInput';
import { format } from 'date-fns';

const MainPage = styled.div`
  display: flex;
  //width: 100%;
  min-height: 20rem;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px;
  border: 1px solid #333;

  @media (max-width: 900px) {
    border: none;
  }
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const InputContainer = styled.div`
  display: flex;
  width: 95%;
  margin: 20px 20px;
  padding: 10px;
  gap: 55px;

  @media (max-width: 900px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;
const InputWrapper = styled.div`
  width: 100%;
`;

const FieldSet = styled.fieldset`
  width: 100%;
  padding: 40px;
  margin: 10px 0;
`;
const Legend = styled.legend`
  font-weight: bold;
  font-size: larger;
`;

const AddStudent = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  const { token, id } = useParams();

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

  const onSubmit = async (values) => {
    const data = new FormData();

    data.append('fullName', values.fullName);
    data.append('gender', values.gender);
    data.append('dateOfBirth', format(values.dateOfBirth, 'do-MMM-yyyy'));
    data.append('phoneNumber', values.phoneNumber);
    data.append('address', values.address);
    data.append('bloodGroup', values.bloodGroup);
    data.append('photoId', values.photoId);
    data.append('healthInsurance', values.healthInsurance);
    data.append('religion', values.religion);
    data.append('password', values.password);
    data.append('city', values.city);
    data.append('hometown', values.hometown);
    data.append('username', values.username);
    data.append('emergencyContactName', values.emergencyContactName);
    data.append('emergencyContactNumber', values.emergencyContactNumber);
    data.append('emergencyContactAddress', values.emergencyContactAddress);
    try {
      setLoading(true);
      const res = await axios.post(
        `${baseUrl}/staff/signup/${token}/${id}`,
        data
      );
      if (res) {
        Store.addNotification({
          title: 'Success!',
          message: `Account registration completed successfully`,
          type: 'success',
          insert: 'top',
          container: 'top-right',
          animationIn: ['animate__animated', 'animate__bounceIn'],
          animationOut: ['animate__animated', 'animate__bounceOut'],
          dismiss: {
            duration: 10000,
          },
        });
        navigate(`/login`);
      }
      setLoading(false);
    } catch (err) {
      handleError(err.response.data.error);
      setLoading(false);
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
      gender: 'female',
      dateOfBirth: '',
      phoneNumber: '',
      address: '',
      bloodGroup: '',
      photoId: null,
      city: '',
      healthInsurance: '',
      hometown: '',
      religion: '',
      username: '',
      password: '',
      repeatPassword: '',
      emergencyContactName: '',
      emergencyContactNumber: '',
      emergencyContactAddress: '',
    },
    validationSchema: StaffSignUpSchema,
    onSubmit: onSubmit,
  });

  console.log(values);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <MainPage>
          <h1>Staff Sign up form</h1>
          <Container>
            <FieldSet>
              <Legend>Personal Information</Legend>
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
                  <fieldset>
                    <legend>Gender</legend>
                    <div style={{ display: 'flex' }}>
                      <TextInput
                        type='radio'
                        label='Male'
                        name='gender'
                        checked={values.gender === 'male'}
                        value={`male`}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <TextInput
                        type='radio'
                        label='Female'
                        checked={values.gender === 'female'}
                        name='gender'
                        value={`female`}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
                  </fieldset>
                  {touched.gender && errors.gender ? (
                    <ErrorContainer>
                      <ErrorMessage>{errors.gender}</ErrorMessage>
                    </ErrorContainer>
                  ) : null}
                </InputWrapper>
                <InputWrapper>
                  <DateInput
                    label='Date Of Birth'
                    name='dateOfBirth'
                    selected={values.dateOfBirth}
                    onChange={(e) => {
                      setFieldValue('dateOfBirth', e);
                    }}
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
                    label='Address (GhanaPost GPS)'
                    name='address'
                    value={values.address}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.address && errors.address && (
                    <ErrorContainer>
                      <ErrorMessage>{errors.address}</ErrorMessage>
                    </ErrorContainer>
                  )}
                </InputWrapper>
              </InputContainer>

              <InputContainer>
                <InputWrapper>
                  <TextInput
                    label='Phone Number'
                    placeholder='e.g +23354433223333'
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
                    label='Profile Picture'
                    type='file'
                    name='photoId'
                    onChange={(event) => {
                      setFieldValue('photoId', event.currentTarget.files[0]);
                    }}
                    onBlur={handleBlur}
                  />
                </InputWrapper>
              </InputContainer>
            </FieldSet>

            <FieldSet>
              <Legend style={{ margin: '80px 0' }}>Emergency Contact</Legend>

              <InputContainer>
                <InputWrapper>
                  <TextInput
                    label={`Emergency Contact's Full Name`}
                    name='emergencyContactName'
                    value={values.emergencyContactName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.emergencyContactName &&
                  errors.emergencyContactName ? (
                    <ErrorContainer>
                      <ErrorMessage>{errors.emergencyContactName}</ErrorMessage>
                    </ErrorContainer>
                  ) : null}
                </InputWrapper>
                <InputWrapper>
                  <TextInput
                    label={`Emergency Contact's Phone`}
                    name='emergencyContactNumber'
                    placeholder='e.g +23354433223333'
                    value={values.emergencyContactNumber}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.emergencyContactNumber &&
                  errors.emergencyContactNumber ? (
                    <ErrorContainer>
                      <ErrorMessage>
                        {errors.emergencyContactNumber}
                      </ErrorMessage>
                    </ErrorContainer>
                  ) : null}
                </InputWrapper>
                <InputWrapper>
                  <TextInput
                    label={`Emergency Contact's Address`}
                    name='emergencyContactAddress'
                    value={values.emergencyContactAddress}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.emergencyContactAddress &&
                  errors.emergencyContactAddress ? (
                    <ErrorContainer>
                      <ErrorMessage>
                        {errors.emergencyContactAddress}
                      </ErrorMessage>
                    </ErrorContainer>
                  ) : null}
                </InputWrapper>
              </InputContainer>
            </FieldSet>

            <FieldSet>
              <Legend style={{ margin: '80px 0' }}>Login Information</Legend>

              <InputContainer>
                <InputWrapper>
                  <TextInput
                    label={`Username`}
                    placeholder='e.g benjamin900'
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
                <InputWrapper>
                  <TextInput
                    label={`Password`}
                    type='password'
                    name='password'
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.password && errors.password ? (
                    <ErrorContainer>
                      <ErrorMessage>{errors.password}</ErrorMessage>
                    </ErrorContainer>
                  ) : null}
                </InputWrapper>
                <InputWrapper>
                  <TextInput
                    label={`Repeat Password`}
                    type='password'
                    name='repeatPassword'
                    value={values.repeatPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.repeatPassword && errors.repeatPassword ? (
                    <ErrorContainer>
                      <ErrorMessage>{errors.repeatPassword}</ErrorMessage>
                    </ErrorContainer>
                  ) : null}
                </InputWrapper>
              </InputContainer>
            </FieldSet>

            <div style={{ margin: '40px 0' }}>
              <PrimaryButton type='submit' label='Signup' />
            </div>
          </Container>
        </MainPage>
      </form>
      {errorMessage ? (
        <Notification type='error' message={errorMessage} />
      ) : null}
    </div>
  );
};

export default AddStudent;
