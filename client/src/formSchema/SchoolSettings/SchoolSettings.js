import * as yup from 'yup';

const schoolSettingSchema = yup.object().shape({
  email: yup.string(),
  hubtelClientId: yup.string(),
  hubtelClientSecret: yup.string(),
  schoolCrest: yup
    .mixed()
    .test(
      'fileSize',
      'File size is too large. Please select an image less than 5 MB.',
      (value) => {
        return value && value.size <= 5000000;
      }
    )
    .test(
      'fileType',
      'Invalid file type. Please select an image file.',
      (value) => {
        return value && value.type.startsWith('image/');
      }
    ),
});

export default schoolSettingSchema;
