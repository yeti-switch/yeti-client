import * as cdrs from './cdrs';
import * as rates from './rates';
import * as account from './account';
import * as networks from './networks';
import * as common from './common';
import * as networkDetails from './networkDetails';
import * as invoices from './invoices';

export default {
  ...cdrs, ...rates, ...account, ...networks, ...networkDetails, ...common, ...invoices,
};
