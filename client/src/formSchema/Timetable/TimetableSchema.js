import * as yup from 'yup';

const TimetableSchema = yup.object().shape({
  classSchoolId: yup.string().required(`Class selection is required`),
  sectionId: yup.string().required('Section selection is required'),
  subjectId: yup.string().required('Subject selection is required'),
  startTime: yup.string().required('Indicate the start time.'),
  endTime: yup.string().required('Indicate the end time.'),
  day: yup.number().required('Indicate the day.'),
  roomNumber: yup.string(),
  staffId: yup.string(),
});

export default TimetableSchema;
