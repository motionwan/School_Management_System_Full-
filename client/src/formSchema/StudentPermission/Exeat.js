import * as yup from 'yup';

const ExeatSchema = yup.object().shape({
  classSchoolId: yup.string().required('Class is required'),
  sectionId: yup.string().required('Section is required'),
  reason: yup.string().required('Reason for permission is required'),
  startDate: yup.date().required('Start date is required'),
  endDate: yup.date().required('End date is required'),
  isApproved: yup.boolean(),
  approvedBy: yup.string(),
  addedBy: yup.string(),
  schoolId: yup.string(),
  studentRecordId: yup.string().required('Student selection is required'),
});

export default ExeatSchema;
