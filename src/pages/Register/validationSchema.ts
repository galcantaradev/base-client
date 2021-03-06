import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  name: Yup.string().required('name is required').trim(),
  email: Yup.string().email('email is invalid').required('email is required'),
  password: Yup.string()
    .required('password is required')
    .min(7, 'password must be greater than 6'),
  passwordConfirmation: Yup.string().oneOf(
    [Yup.ref('password')],
    'passwords must match'
  )
});
