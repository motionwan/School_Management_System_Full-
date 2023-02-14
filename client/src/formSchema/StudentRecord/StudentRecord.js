import * as yup from 'yup';

const StudentRecord = yup.object().shape({
  fullName: yup.string().required('Full Name is required'),
  // admissionNumber: yup.string().required('Session label is required'),
  gender: yup.string().required('Gender is required'),
  dateOfBirth: yup.date().required('Date of birth is required'),
  phoneNumber: yup.string().required('Phone number is required'),
  email: yup
    .string()
    .email('Please enter a valid email')
    .required('Email is required'),
  address: yup.string().required('Address is required'),
  admissionDate: yup.date().required('Date of admission is required'),
  bloodGroup: yup.string(),
  guardianName: yup.string().required('Guardian name is required'),
  guardianPhoneNumber: yup
    .string()
    .required('Guardian phone number is required'),
  motherOccupation: yup.string(),
  photoId: yup
    .mixed()
    .test(
      'fileSize',
      'File size is too large. Please select an image less than 5 MB.',
      (value) => {
        return value && value.size <= 5000000;
      }
    )
    .test(
      'fileType',
      'Invalid file type. Please select an image file.',
      (value) => {
        return value && value.type.startsWith('image/');
      }
    ),
  sectionId: yup.string().required('Program is required'),
  username: yup.string().required('username is required'),
  city: yup.string().required('City where you stay is required'),
  healthInsurance: yup.string(),
  hometown: yup.string(),
  religion: yup.string(),
  classSchoolId: yup.string().required('Class is required'),
});

export default StudentRecord;
