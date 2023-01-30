import * as yup from 'yup';

const signInSchema = yup.object().shape({
  login: yup.string().required('Your email or username is required for login'),
  password: yup.string().required('Your password is required for login'),
});

export default signInSchema;
