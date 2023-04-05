import * as yup from 'yup';

const invoiceSchema = yup.object().shape({
  title: yup.string().required('Title for invoice is required'),
  sectionId: yup.string().required('Select course/program'),
  classSchoolId: yup.string().required('Select class'),
  //   academicYearId:yup.string().required('Please select and academic year'),
  termId: yup.string().required('Select term/semester'),
  dueDate: yup.date().required('Select due date'),
});

export default invoiceSchema;
