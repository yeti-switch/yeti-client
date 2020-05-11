import {
  requiresAuth,
  beforeGuardEnchancer,
} from '@/router/helpers';
import {

  NETWORK_DETAILS_PATH,
  NETWORK_DETAILS_ROUTE_NAME,
} from '@/constants/routing';

import NetworkDetails from './NetworkDetails';

export const routes = [
  {
    path: NETWORK_DETAILS_PATH,
    name: NETWORK_DETAILS_ROUTE_NAME,
    component: NetworkDetails,
    beforeEnter: beforeGuardEnchancer([requiresAuth]),
  },
];
