import Cdrs from './Cdrs';
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
    path: STATISTICS_PATHS.CDRS,
    name: STATISTICS_ROUTE_NAMES.CDRS,
    component: Cdrs,
    beforeEnter: beforeGuardEnchancer([requiresAuth, filterBlockedPages]),
  },
];
