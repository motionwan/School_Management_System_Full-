import * as yup from 'yup';

const SUPPORTED_FORMATS = [
  'image/jpg',
  'image/jpeg',
  'image/png',
  'image/gif',
  'video/mp4',
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.ms-powerpoint',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
];
const MAX_FILE_SIZE = 314572800; // 300MB in bytes

const LearningMaterialSchema = yup.object().shape({
  classSchoolId: yup.string().required('Class is required'),
  sectionId: yup.string().required('Section is required'),
  subjectId: yup.string().required('Section is required'),
  label: yup.string().required('Title is required'),
  description: yup.string(),
  attachment: yup
    .mixed()
    .test(
      'fileFormat',
      'Unsupported file format',
      (value) => !value || SUPPORTED_FORMATS.includes(value.type)
    )
    .test(
      'fileSize',
      'File size too large',
      (value) => !value || value.size <= MAX_FILE_SIZE
    ),
  url: yup.string(),
});

export default LearningMaterialSchema;
