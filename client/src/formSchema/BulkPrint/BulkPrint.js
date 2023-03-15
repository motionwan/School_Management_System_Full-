import * as yup from 'yup';

const BulkPrinkSchema = yup.object().shape({
  sectionId: yup.string().required('Program/Course is required'),
  classSchoolId: yup.string().required('Class is required'),
  examId: yup.string().required('Exam is required'),
  studentRecordId: yup.string().required('Student is required'),
});

export default BulkPrinkSchema;
