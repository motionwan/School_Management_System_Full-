import * as yup from 'yup';

const AttendanceSchema = yup.object().shape({
  date: yup.date().required('Date is required'),
});

export default AttendanceSchema;
