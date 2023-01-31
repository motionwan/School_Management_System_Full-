import * as yup from 'yup';

const TermSchema = yup.object().shape({
  label: yup.string().required('Session name is required'),
  startDate: yup.date().required('Start date is required'),
  endDate: yup.date().required('End date is required'),
});

export default TermSchema;
