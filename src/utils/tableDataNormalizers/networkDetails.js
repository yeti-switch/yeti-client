import { omit, lowerCase, capitalize } from 'lodash';

export const formatNetworkDetails = (networkDetails, excludedFields) => {
  if (networkDetails) {
    networkDetails.uuid = networkDetails.id;
    networkDetails['network-type'] = networkDetails['network-type'].name;

    const result = Object.entries(
    // Get rid of not needed properties
      omit(networkDetails, [...excludedFields, 'id']),
    ).reduce((resultObj, [key, value]) => {
    // Make keys more human-readable
      resultObj[capitalize(lowerCase(key))] = value;

      return resultObj;
    }, {});

    return [result];
  }

  // Fallback to empty network details
  return [{}];
};
