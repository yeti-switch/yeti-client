import Accounts from './Accounts';
import {
  requiresAuth,
  filterBlockedPages,
  beforeGuardEnchancer,
} from '../../router/helpers';
import {
  STATISTICS_ROUTE_NAMES,
  STATISTICS_PATHS,
  GENERAL_ROUTE_NAMES,
} from '../../constants/routing';
import ViewFilters from '../ViewFilters/ViewFilters';

export const routes = [
  {
    path: STATISTICS_PATHS.ACCOUNTS,
    name: STATISTICS_ROUTE_NAMES.ACCOUNTS,
    components: {
      default: Accounts,
      [GENERAL_ROUTE_NAMES.VIEW_FILTERS]: ViewFilters,
    },
    beforeEnter: beforeGuardEnchancer([requiresAuth, filterBlockedPages]),
  },
];
