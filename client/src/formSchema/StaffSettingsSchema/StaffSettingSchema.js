import * as yup from 'yup';

const staffSettingsSchema = yup.object().shape({
  zoomApiKey: yup.string().required('Zoom API key is required'),
  zoomApiSecret: yup.string().required('Zoom API Secret is required'),
});
export default staffSettingsSchema;
