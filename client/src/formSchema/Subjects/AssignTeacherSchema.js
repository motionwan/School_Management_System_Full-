import * as yup from 'yup';

const AssignTeacherSchema = yup.object().shape({
  teacherId: yup.string().required('You must select a teacher'),
});

export default AssignTeacherSchema;
