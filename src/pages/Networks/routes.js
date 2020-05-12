import {
  requiresAuth,
  filterBlockedPages,
  beforeGuardEnchancer,
} from '@/router/helpers';
import {
  ACCOUNT_INFO_PATHS,
  ACCOUNT_INFO_ROUTE_NAMES,
} from '@/constants/routing';

import Networks from './Networks';

export const routes = [
  {
    path: ACCOUNT_INFO_PATHS.NETWORKS,
    name: ACCOUNT_INFO_ROUTE_NAMES.NETWORKS,
    component: Networks,
    beforeEnter: beforeGuardEnchancer([requiresAuth, filterBlockedPages]),
  },
];
