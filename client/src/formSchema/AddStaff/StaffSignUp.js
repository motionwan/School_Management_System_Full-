import * as yup from 'yup';

const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif'];
const MAX_FILE_SIZE = 9145728; // 9MB in bytes

const StaffSignUpSchema = yup.object().shape({
  fullName: yup.string().required('Full Name is required'),
  // admissionNumber: yup.string().required('Session label is required'),
  gender: yup.string().required('Gender is required'),
  dateOfBirth: yup.string().required('Date of birth is required'),
  phoneNumber: yup
    .string()
    .required('Phone number is required')
    .matches(
      /^\+(?:[0-9] ?){6,14}[0-9]$/,
      'Phone number must be a valid international format'
    ),
  address: yup.string().required('Address is required'),
  bloodGroup: yup.string(),
  emergencyContactName: yup
    .string()
    .required('Emergency contact name is required'),
  emergencyContactNumber: yup
    .string()
    .required('Emergency contact Phone number is required')
    .matches(
      /^\+(?:[0-9] ?){6,14}[0-9]$/,
      'Phone number must be a valid international format'
    ),
  emergencyContactAddress: yup
    .string()
    .required(`The GhanaPost address of emergency Contact is required`),
  photoId: yup
    .mixed()
    .test(
      'fileFormat',
      'Unsupported file format',
      (value) => !value || SUPPORTED_FORMATS.includes(value.type)
    )
    .test(
      'fileSize',
      'File size too large',
      (value) => !value || value.size <= MAX_FILE_SIZE
    ),
  username: yup.string().required('username is required'),
  city: yup.string().required('City where you stay is required'),
  healthInsurance: yup.string(),
  hometown: yup.string(),
  religion: yup.string(),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
  repeatPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Repeat password.'),
});

export default StaffSignUpSchema;
