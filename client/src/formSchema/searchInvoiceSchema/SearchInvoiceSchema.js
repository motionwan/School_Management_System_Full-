import * as yup from 'yup';

const searchInvoiceSchema = yup.object().shape({
  sectionId: yup.string().required('Select course/program'),
  classSchoolId: yup.string().required('Select class'),
});

export default searchInvoiceSchema;
