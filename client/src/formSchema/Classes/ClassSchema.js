import * as yup from 'yup';

const ClassSchema = yup.object().shape({
  label: yup.string().required('Please enter the name of the class'),
});

export default ClassSchema;
