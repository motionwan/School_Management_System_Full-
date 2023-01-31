import * as yup from 'yup';

const schoolSchema = yup.object().shape({
  label: yup.string().required('Please enter the name of the school'),
  email: yup
    .string()
    .email('You need a valid email address')
    .required('School email is required'),
  description: yup.string(),
  phone: yup.string().required('Please enter the phone number for school'),
  address: yup.string(),
  admissionBaseNumber: yup.number(),
  admissionPrefix: yup.string().max(6),
  admissionPadding: yup.number().max(16),
  enrollmentPrefix: yup.string().max(6),
  enrollmentBaseNumber: yup.number(),
  enrollmentPadding: yup.number().max(16),
  status: yup.boolean(),
});
export default schoolSchema;
