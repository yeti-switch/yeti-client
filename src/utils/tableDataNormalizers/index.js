import * as cdrs from './cdrs';
import * as rates from './rates';
import * as account from './account';
import * as networks from './networks';
import * as networkDetails from './networkDetails';

export default {
  ...cdrs, ...rates, ...account, ...networks, ...networkDetails,
};
