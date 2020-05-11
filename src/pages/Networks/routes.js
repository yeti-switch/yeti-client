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
import ViewFilters from '@/components/ViewFilters/ViewFilters';

import Networks from './Networks';

export const routes = [
  {
    path: ACCOUNT_INFO_PATHS.NETWORKS,
    name: ACCOUNT_INFO_ROUTE_NAMES.NETWORKS,
    components: {
      default: Networks,
      [GENERAL_ROUTE_NAMES.VIEW_FILTERS]: ViewFilters,
    },
    beforeEnter: beforeGuardEnchancer([requiresAuth, filterBlockedPages]),
  },
];
