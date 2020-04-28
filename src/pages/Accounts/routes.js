import {
  requiresAuth,
  filterBlockedPages,
  beforeGuardEnchancer,
} from '@/router/helpers';
import {
  ACCOUNT_INFO_ROUTE_NAMES,
  ACCOUNT_INFO_PATHS,
  GENERAL_ROUTE_NAMES,
} from '@/constants/routing';

// @todo what is wrong with this import?
// eslint-disable-next-line import/no-unresolved
import Accounts from './Accounts';
import ViewFilters from '@/components/ViewFilters/ViewFilters';

export const routes = [
  {
    path: ACCOUNT_INFO_PATHS.ACCOUNTS,
    name: ACCOUNT_INFO_ROUTE_NAMES.ACCOUNTS,
    components: {
      default: Accounts,
      [GENERAL_ROUTE_NAMES.VIEW_FILTERS]: ViewFilters,
    },
    beforeEnter: beforeGuardEnchancer([requiresAuth, filterBlockedPages]),
  },
];
