import { omit } from 'lodash';

export const formatNetworkDetails = (excludedFields) => (networkDetails) => {
  if (networkDetails) {
    networkDetails.uuid = networkDetails.id;
    networkDetails['network-type'] = networkDetails['network-type'].name;

    return Object.entries(
    // Get rid of not needed properties
      omit(networkDetails, [...excludedFields, 'id']),
    );
  }

  // Fallback to empty network details
  return [];
};
