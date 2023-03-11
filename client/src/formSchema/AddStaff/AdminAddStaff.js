import * as yup from 'yup';

const AdminAddStaffSchema = yup.object().shape({
  email: yup
    .string()
    .email('enter a valid email')
    .required(`Staff's email is required`),
  // phoneNumber: yup
  //   .string()
  //   .required('Phone number is required')
  //   .matches(
  //     /^\+(?:[0-9] ?){6,14}[0-9]$/,
  //     'Phone number must be a valid international format'
  //   ),
  role: yup
    .array()
    .of(yup.string().required('Role is required'))
    .min(1, 'At least one role needs to be selected'),
  classSchoolId: yup.string(),
  sectionId: yup.string().nullable(),
  //code: yup.string().required('Subject Code is required'),
});

export default AdminAddStaffSchema;
