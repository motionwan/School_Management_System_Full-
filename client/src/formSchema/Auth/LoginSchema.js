import * as yup from 'yup';

const signInSchema = yup.object().shape({
  login: yup.string().required('email or username is required'),
  password: yup.string().required('Password is required'),
});

export default signInSchema;
