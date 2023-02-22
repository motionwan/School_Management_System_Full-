import * as yup from 'yup';

const RolesSchema = yup.object().shape({
  name: yup.string().required('Role name is required'),
  selectedPermissions: yup
    .array()
    .of(yup.string().required('Please select at least one permission.')),
});

export default RolesSchema;
