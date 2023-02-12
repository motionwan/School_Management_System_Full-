import * as yup from 'yup';

const AttendanceSchema = yup.object().shape({
  classSchoolId: yup.string().required('Class is required'),
  sectionId: yup.string().required('Section is required'),
  date: yup.date().required('Date is required'),
});

export default AttendanceSchema;
