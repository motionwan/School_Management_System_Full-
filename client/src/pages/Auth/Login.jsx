import React, { useEffect, useState } from 'react';
import { TertiaryOutlineButton } from '../../Components/Buttons/TertiaryButton';
import Input from '../../Components/Input/Input';
import {
  InputWrapper,
  LoginButtonContainer,
  LoginInputContainer,
  PageContainer,
} from './Login.styles';
import { useFormik } from 'formik';
import { useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';
import { baseUrl } from '../../helpers/baseUrl';
import loginSchema from '../../formSchema/Auth/LoginSchema';
import {
  ErrorContainer,
  ErrorMessage,
} from '../../Components/ErrorComponent/Error';
import Notification from '../../Components/Notification/Notification';
import Spinner from '../../Components/Spinner/Spinner';

const Login = () => {
  const [pageLoading, setPageLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { setAuth, setPersist, persist } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/dashboard';
  const onSubmit = async () => {
    setPageLoading(true);
    try {
      const res = await axios.post(
        `${baseUrl}/staff/login`,
        {
          login: values.login.toLowerCase(),
          password: values.password,
        },
        { withCredentials: true }
      );
      setAuth({
        accessToken: res?.data?.accessToken,
        permissions: res?.data?.role,
        username: res?.data?.username,
        image: res?.data?.image,
        userId: res?.data?.userId,
        schoolId: res?.data?.schoolId,
        currentTermId: res?.data?.currentTermId,
      });
      // console.log(res.data.role);
      //console.log(res?.data);
      if (res.status === 401) {
        setPageLoading(false);
        console.log('Email, Username or Password is incorrect');
      }
      navigate(from, { replace: true });
    } catch (err) {
      setPageLoading(false);
      handleError(err.response.data.message);
      console.error(err);
    }
  };

  const handleError = (error) => {
    setErrorMessage(error);

    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
  };

  const togglePersist = () => {
    setPersist((prev) => !prev);
  };
  useEffect(() => {
    localStorage.setItem('persist', persist);
  }, [persist]);

  const { errors, values, touched, handleSubmit, handleChange, handleBlur } =
    useFormik({
      initialValues: {
        login: 'bensmith',
        password: '123456',
      },
      validationSchema: loginSchema,
      onSubmit,
    });

  return (
    <div>
      {pageLoading ? (
        <Spinner />
      ) : (
        <PageContainer>
          {errorMessage ? (
            <Notification message={errorMessage} type='error' />
          ) : null}
          <form onSubmit={handleSubmit}>
            <LoginInputContainer>
              {/* <ErrorContainer>
                <ErrorMessage>{errorMessage ? errorMessage : null}</ErrorMessage>
              </ErrorContainer> */}
              <InputWrapper>
                <Input
                  placeholder='Email/username'
                  label='Username/Email'
                  onChange={handleChange}
                  name='login'
                  value={values.login}
                  handleBlur={handleBlur}
                />
                <ErrorContainer>
                  <ErrorMessage>
                    {touched.login ? errors.login : null}
                  </ErrorMessage>
                </ErrorContainer>
              </InputWrapper>
              <InputWrapper style={{ marginTop: '-55px' }}>
                <Input
                  placeholder='Password'
                  label='Password'
                  type='password'
                  name='password'
                  onChange={handleChange}
                  value={values.password}
                  handleBlur={handleBlur}
                />
                <ErrorContainer>
                  <ErrorMessage>
                    {touched.password ? errors.password : null}
                  </ErrorMessage>
                </ErrorContainer>
              </InputWrapper>
              <LoginButtonContainer>
                <TertiaryOutlineButton type='submit' label='Login' />
              </LoginButtonContainer>
            </LoginInputContainer>
          </form>
        </PageContainer>
      )}
    </div>
  );
};

export default Login;
