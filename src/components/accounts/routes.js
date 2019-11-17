import Accounts from './Accounts';
import {
  requiresAuth,
  filterBlockedPages,
  beforeGuardEnchancer,
} from '../../router/helpers';
import {
  STATISTICS_ROUTE_NAMES,
  STATISTICS_PATHS,
} from '../../constants/routing';

// eslint-disable-next-line
export const routes = [
  {
    path: STATISTICS_PATHS.ACCOUNTS,
    name: STATISTICS_ROUTE_NAMES.ACCOUNTS,
    component: Accounts,
    beforeEnter: beforeGuardEnchancer([requiresAuth, filterBlockedPages]),
  },
];
