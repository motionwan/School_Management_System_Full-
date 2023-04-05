import * as yup from 'yup';

const RolesSchema = yup.object().shape({
  classSchoolId: yup.string().required('Class name is required'),
  sectionId: yup.string().required('Section name is required'),
  // classSchoolId: yup.string().required('Class name is required'),
});

export default RolesSchema;
