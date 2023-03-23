import * as yup from 'yup';

const HostelSchema = yup.object().shape({
  hostelName: yup.string().required('Hostel/House name is required'),
  intake: yup
    .number('Can only be a number')
    .positive('Capacity cannot be negative'),
  address: yup.string(),
  type: yup.string(),
});

export default HostelSchema;
