import * as Yup from 'yup';

const examResultSchema = Yup.object().shape({
  // examPaperId: Yup.string().required('Exams Paper is required'),
  // sectionId: Yup.string().required('Section is required'),
  // examId: Yup.string().required('Exams is required'),
  // classSchoolId: Yup.string().required('Class is required'),
  // results: Yup.array()
  //   .of(
  //     Yup.object().shape({
  //       // studentRecordId: Yup.string().required('Student ID is required'),
  //       // subjectId: Yup.string().required('Subject ID is required'),
  //       classScore: Yup.number()
  //         .min(0, 'Class Score cannot be negative')
  //         .max(30, 'Class score cannot be greater than 30')
  //         .required('Class score is required'),
  //       examsScore: Yup.number()
  //         .min(0, 'Exams Score cannot be negative')
  //         .required('Exams score is required'),
  //       studentRecordId: Yup.string(),
  //     })
  //   )
  //   .min(1, 'At least one student result is required'),

  examScore: Yup.number().required('Required'),
  classScore: Yup.number().required('Required'),
});

export default examResultSchema;
