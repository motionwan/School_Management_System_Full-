import * as yup from 'yup';

const LearningMaterialSchema = yup.object().shape({
  classSchoolId: yup.string().required('Class is required'),
  sectionId: yup.string().required('Section is required'),
  subjectId: yup.string().required('Section is required'),
  title: yup.string().required('Title is required'),
  description: yup.string(),
  learningMaterialId: yup.string(),
  url: yup.string(),
  addedBy: yup.string(),
});

export default LearningMaterialSchema;
