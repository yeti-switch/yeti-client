import { omit, lowerCase, capitalize } from 'lodash';

export const formatAccount = (excludedFields, accountDetails = {}) => Object.entries(
  // Get rid of not needed properties
  omit(accountDetails, excludedFields),
).map(([key, value]) => ({ key: capitalize(lowerCase(key)), value }));
