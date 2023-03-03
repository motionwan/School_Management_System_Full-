import * as yup from 'yup';

const ExamSchema = yup.object().shape({
  examsInfo: yup.object().shape({
    sectionId: yup.string().required('Program/Course is required'),
    classSchoolId: yup.string().required('Class is required'),
    startDate: yup.date().required('Start Date is required'),
    endDate: yup.date().required('End Date is required'),
    title: yup.string().required('Exam title is required'),
    examCenter: yup.string(),
  }),
  paperInfo: yup.array().of(
    yup.object().shape({
      subjectId: yup.string().required('Subject is required'),
      paperDate: yup.date().required('Paper Date is required'),
      maximumMark: yup.number().required('Maximum Mark is required'),
      startTime: yup.string().required('Start Time is required'),
      endTime: yup.string().required('End Time is required'),
      roomNumber: yup.string(),
    })
  ),
});

export default ExamSchema;
