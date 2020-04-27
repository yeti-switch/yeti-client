import {
  requiresAuth,
  filterBlockedPages,
  beforeGuardEnchancer,
} from '@/router/helpers';
import {
  ACCOUNT_INFO_PATHS,
  ACCOUNT_INFO_ROUTE_NAMES,
  GENERAL_ROUTE_NAMES,
} from '@/constants/routing';

import Rates from './Rates';
import ViewFilters from '../ViewFilters/ViewFilters';

export const routes = [
  {
    path: ACCOUNT_INFO_PATHS.RATES,
    name: ACCOUNT_INFO_ROUTE_NAMES.RATES,
    components: {
      default: Rates,
      [GENERAL_ROUTE_NAMES.VIEW_FILTERS]: ViewFilters,
    },
    beforeEnter: beforeGuardEnchancer([requiresAuth, filterBlockedPages]),
  },
];
