import * as yup from 'yup';

const SubjectSchema = yup.object().shape({
  label: yup.string().required(`Subject's label is required`),
  code: yup.string().required('Subject Code is required'),
  type: yup.string().required('Subject type is required'),
  category: yup.string().required('Subject category is required'),
  classSchoolId: yup.string().required('Class is required.'),
  sectionId: yup.string().required('Section is required.'),
});

export default SubjectSchema;
