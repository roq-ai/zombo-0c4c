import * as yup from 'yup';

export const favoriteOrganizationValidationSchema = yup.object().shape({
  user_id: yup.string().nullable(),
  organization_id: yup.string().nullable(),
});
