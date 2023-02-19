import * as yup from 'yup';

const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif'];
const MAX_FILE_SIZE = 9145728; // 9MB in bytes

const EventSchema = yup.object().shape({
  title: yup.string().required('Event title is required'),
  description: yup.string().required('Event body is required'),
  eventDate: yup.string().required('Event date is required'),
  status: yup.boolean().required('Status is required'),
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

export default EventSchema;
