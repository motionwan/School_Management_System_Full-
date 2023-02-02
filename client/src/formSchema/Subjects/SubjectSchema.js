import * as yup from 'yup';

const SubjectSchema = yup.object().shape({
  label: yup.string().required(`Subject's label is required`),
  code: yup.string().required('Subject Code is required'),
  type: yup.string().required('Subject type is required'),
  classSchoolId: yup
    .string()
    .required('Select the class you want this subject to be assigned to.'),
});

export default SubjectSchema;
