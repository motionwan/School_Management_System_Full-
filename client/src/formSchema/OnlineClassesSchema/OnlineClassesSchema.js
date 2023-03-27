import * as yup from 'yup';

const onlineClassSchema = yup.object().shape({
  topic: yup.string().required('Topic is required'),
  password: yup.string().required('Password is required'),
  startTime: yup.string().required('Start Time is required'),
  duration: yup
    .number()
    .positive('Duration should be positive')
    .required('Duration is required'),
  status: yup.boolean(),
});
export default onlineClassSchema;
