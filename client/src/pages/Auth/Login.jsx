import React from 'react';
import { TertiaryOutlineButton } from '../../Components/Buttons/TertiaryButton';
import Input from '../../Components/Input/Input';
import {
  InputWrapper,
  LoginButtonContainer,
  LoginInputContainer,
  PageContainer,
} from './Login.styles';
import { useFormik } from 'formik';

const Login = () => {
  return (
    <div>
      <PageContainer>
        <LoginInputContainer>
          <InputWrapper>
            <Input placeholder='Email/username' label='Username/Email' />
          </InputWrapper>
          <InputWrapper style={{ marginTop: '-15px' }}>
            <Input placeholder='Password' label='Password' type='password' />
          </InputWrapper>
          <LoginButtonContainer>
            <TertiaryOutlineButton label='Login' />
          </LoginButtonContainer>
        </LoginInputContainer>
      </PageContainer>
    </div>
  );
};

export default Login;
