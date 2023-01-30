import React, { useEffect } from 'react';
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

const Login = () => {
  const { setAuth, auth, setPersist, persist } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/dashboard';
  const onSubmit = async () => {
    try {
      const res = await axios.post(
        `${baseUrl}/users/login`,
        {
          login: values.email,
          password: values.password,
        },
        { withCredentials: true }
      );
      console.log(res.data);

      setAuth({
        accessToken: res?.data?.accessToken,
        roles: [res?.data?.role],
        errMessage: res?.data?.message,
        username: res?.data?.username,
        constituencyId: res?.data?.constituencyId,
        regionId: res?.data?.regionId,
        currentElectionYearId: res?.data?.electionYearId,
        image: res?.data?.image,
        userId: res?.data?.userId,
      });
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
    }
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
        login: '',
        password: '',
      },
      validationSchema: loginSchema,
      onSubmit,
    });

  return (
    <div>
      <PageContainer>
        <form onSubmit={handleSubmit}>
          <LoginInputContainer>
            <InputWrapper>
              <Input
                placeholder='Email/username'
                label='Username/Email'
                onChange={handleChange}
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
              <TertiaryOutlineButton label='Login' />
            </LoginButtonContainer>
          </LoginInputContainer>
        </form>
      </PageContainer>
    </div>
  );
};

export default Login;
