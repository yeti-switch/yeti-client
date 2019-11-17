import Rates from './Rates';
import {
  requiresAuth,
  filterBlockedPages,
  beforeGuardEnchancer,
} from '../../router/helpers';
import {
  STATISTICS_PATHS,
  STATISTICS_ROUTE_NAMES,
} from '../../constants/routing';

// eslint-disable-next-line
export const routes = [
  {
    path: STATISTICS_PATHS.RATES,
    name: STATISTICS_ROUTE_NAMES.RATES,
    component: Rates,
    beforeEnter: beforeGuardEnchancer([requiresAuth, filterBlockedPages]),
  },
];
