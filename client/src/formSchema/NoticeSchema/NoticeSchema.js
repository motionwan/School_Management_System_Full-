import * as yup from 'yup';

const SUPPORTED_FORMATS = [
  'image/jpg',
  'image/jpeg',
  'image/png',
  'image/gif',
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.ms-powerpoint',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
];
const MAX_FILE_SIZE = 9145728; // 9MB in bytes

const NoticeSchema = yup.object().shape({
  topic: yup.string().required('Topic is required'),
  description: yup.string().required('Notice body is required'),
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
});

export default NoticeSchema;
