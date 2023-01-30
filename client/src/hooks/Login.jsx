import React, { useEffect } from 'react';
import {
  TextInput,
  Checkbox,
  PrimaryButton,
  FormHeading,
} from '../components/FormComponents';
import { BsFillUnlockFill } from 'react-icons/bs';
import { useFormik } from 'formik';
import axios from 'axios';
import useAuth from '../hooks/useAuth';
import { useNavigate, useLocation } from 'react-router-dom';
import signInSchema from '../formSchema/signinSchema';
import { baseUrl } from '../helpers/baseUrl';

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
        email: '',
        password: '',
      },
      validationSchema: signInSchema,
      onSubmit,
    });
  return (
    <div className='flex items-center justify-center h-screen bg-gradient-to-t from-primaryColor to-secondaryColor'>
      <div className='flex-col min-h-[22rem] bg-white w-[30rem] rounded-lg shadow-lg p-4'>
        <FormHeading label='Login' />
        <div className='flex items-center justify-center'>
          {auth.errMessage ? (
            <p className='text-secondaryColor'>{auth.errMessage}</p>
          ) : null}
        </div>

        <form onSubmit={handleSubmit}>
          <div className='mb-8'>
            <TextInput
              label='Username/Email'
              name='email'
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.email && errors.email ? (
              <div className='text-secondaryColor'>
                <p>{errors.email}</p>
              </div>
            ) : null}
          </div>
          <div className='mb-4'>
            <TextInput
              type='password'
              label='Password'
              name='password'
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.password && errors.password ? (
              <div className='text-secondaryColor'>
                <p>{errors.password}</p>
              </div>
            ) : null}
          </div>
          <div className='flex items-center justify-between p-4 mt-6'>
            <Checkbox
              onChange={togglePersist}
              checked={persist}
              label='Trust this device'
            />
            <p>Forgot Password?</p>
          </div>
          <div className='flex items-center justify-center'>
            <PrimaryButton
              type='submit'
              label='Login'
              icon={<BsFillUnlockFill />}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
