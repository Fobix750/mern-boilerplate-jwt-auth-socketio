import * as Yup from 'yup';

export const loginSchema = Yup.object({
  username: Yup.string()
    .min(4, 'Must be 4 characters at minimum')
    .required('Required'),
  password: Yup.string()
    .min(6, 'Must be 6 characters at minimum')
    .max(20, 'Must be 20 characters or less')
    .required('Required')
});
