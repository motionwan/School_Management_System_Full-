import * as yup from 'yup';

const ExamPaperSchema = yup.object().shape({
  paperDate: yup.string().required('Paper Date is required'),
  maximumMark: yup
    .number()
    .positive('Maximum Mark must be positive')
    .integer('Maximum Mark must be an integer')
    .required('Maximum mark is required'),
  startTime: yup.string().required('Start Time is required.'),
  endTime: yup.string().required('End Time is required.'),
  roomNumber: yup.string(),
  examCenter: yup.string(),
  examId: yup.string(),
});

export default ExamPaperSchema;
