import * as yup from 'yup';

const ClassSectionSchema = yup.object().shape({
  label: yup.string().required('Session label is required'),
  //classSchoolId: yup.date().required('Start date is required'),
});

export default ClassSectionSchema;
