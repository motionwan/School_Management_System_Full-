import * as yup from 'yup';

const AttendanceSchema = yup.object().shape({
  date: yup.date().required('Date is required'),
  classSchoolId: yup.string().required('Class is required'),
  sectionId: yup.string().required('Section is required'),
});

export default AttendanceSchema;
