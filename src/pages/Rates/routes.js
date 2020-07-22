import {
  requiresAuth,
  filterBlockedPages,
  beforeGuardEnchancer,
} from '@/router/helpers';
import {
  ACCOUNT_INFO_PATHS,
  ACCOUNT_INFO_ROUTE_NAMES,
} from '@/constants/routing';

import Rates from './Rates';

export const routes = [
  {
    path: ACCOUNT_INFO_PATHS.RATES,
    name: ACCOUNT_INFO_ROUTE_NAMES.RATES,
    component: Rates,
    beforeEnter: beforeGuardEnchancer([requiresAuth, filterBlockedPages]),
  },
];
