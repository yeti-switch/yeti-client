import ActiveCallsChart from './ActiveCallsChart';
import {
  requiresAuth,
  filterBlockedPages,
  beforeGuardEnchancer,
} from '../../router/helpers';
import {
  CHARTS_ROUTE_NAMES,
  CHARTS_PATHS,
  GENERAL_ROUTE_NAMES,
} from '../../constants/routing';
import ViewFilters from '../ViewFilters/ViewFilters';

export const routes = [
  {
    path: CHARTS_PATHS.ACTIVE_CALLS,
    name: CHARTS_ROUTE_NAMES.ACTIVE_CALLS,
    components: {
      default: ActiveCallsChart,
      [GENERAL_ROUTE_NAMES.VIEW_FILTERS]: ViewFilters,
    },
    beforeEnter: beforeGuardEnchancer([requiresAuth, filterBlockedPages]),
  },
];
