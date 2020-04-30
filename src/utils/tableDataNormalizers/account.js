import { omit, lowerCase, capitalize } from 'lodash';

export const formatAccount = (accountDetails = {}, excludedFields) => {
  const result = Object.entries(
    // Get rid of not needed properties
    omit(accountDetails, excludedFields),
  ).reduce((resultObj, [key, value]) => {
    // Make keys more human-readable
    resultObj[capitalize(lowerCase(key))] = value;

    return resultObj;
  }, {});

  return [result];
};
