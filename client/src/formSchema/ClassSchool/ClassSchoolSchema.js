import * as yup from 'yup';

const classSchoolSchema = yup.object().shape({
  classId: yup
    .array()
    .of(yup.string().required('A class is required'))
    .min(1, 'Please select at least one class'),
});
export default classSchoolSchema;
