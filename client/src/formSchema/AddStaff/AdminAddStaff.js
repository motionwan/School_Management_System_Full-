import * as yup from 'yup';

const AdminAddStaffSchema = yup.object().shape({
  email: yup
    .string()
    .email('enter a valid email')
    .required(`Staff's email is required`),
  role: yup.string().required('Role is required'),
  classSchoolId: yup.string(),
  sectionId: yup.string().nullable(),
  //code: yup.string().required('Subject Code is required'),
});

export default AdminAddStaffSchema;
