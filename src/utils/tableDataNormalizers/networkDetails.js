import { omit, lowerCase, capitalize } from 'lodash';

export const formatNetworkDetails = (networkDetails, excludedFields) => {
  if (networkDetails) {
    networkDetails.uuid = networkDetails.id;
    networkDetails['network-type'] = networkDetails['network-type'].name;

    return Object.entries(
    // Get rid of not needed properties
      omit(networkDetails, [...excludedFields, 'id']),
    ).map(([key, value]) => ({ key: capitalize(lowerCase(key)), value }));
  }

  // Fallback to empty network details
  return [];
};
