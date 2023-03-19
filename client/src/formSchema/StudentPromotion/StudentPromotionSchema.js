import * as yup from 'yup';

const StudentPromotionSchema = yup.object().shape({
  promotionTerm: yup
    .string()
    .required('Which Academic Year are you promoting to?'),
  promotionFromClass: yup.string().required('This is a required field'),
  promotionToClass: yup
    .string()
    .notOneOf(
      [yup.ref('promotionFromClass')],
      'You cannot promote students to the same class'
    )
    .required('This is a required field'),
  promotionFromSection: yup.string().required('This is a required field'),
  promotionToSection: yup
    .string()
    .notOneOf(
      [yup.ref('promotionFromSection')],
      'You cannot promote students to the same class'
    )
    .required('This is a required field'),
});

export default StudentPromotionSchema;
