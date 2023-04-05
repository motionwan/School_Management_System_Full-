import * as yup from 'yup';

const PayFeesSchema = yup.object().shape({
  amount: yup
    .number('Amount can only be a number')
    .required('Amount is required')
    .positive('Amount cannot be negative'),
  admissionNumber: yup.string().required('Admission number is required'),
});

export default PayFeesSchema;
