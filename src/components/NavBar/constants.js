import {
  ACCOUNT_INFO_PATHS, ACCOUNT_INFO_ROUTE_NAMES,
} from '@/constants';

export const NAV_ITEMS = [{
  routePath: ACCOUNT_INFO_PATHS.RATES,
  routeName: ACCOUNT_INFO_ROUTE_NAMES.RATES,
}, {
  routePath: ACCOUNT_INFO_PATHS.CDRS,
  routeName: ACCOUNT_INFO_ROUTE_NAMES.CDRS,
}, {
  routePath: ACCOUNT_INFO_PATHS.ACCOUNT,
  routeName: ACCOUNT_INFO_ROUTE_NAMES.ACCOUNT,
}, {
  routePath: ACCOUNT_INFO_PATHS.NETWORKS,
  routeName: ACCOUNT_INFO_ROUTE_NAMES.NETWORKS,
}, {
  routePath: ACCOUNT_INFO_PATHS.STATISTICS,
  routeName: ACCOUNT_INFO_ROUTE_NAMES.STATISTICS,
}];

export const ROUTE_TO_ICON_MAPPINGS = {
  [ACCOUNT_INFO_ROUTE_NAMES.RATES]: 'dollar',
  [ACCOUNT_INFO_ROUTE_NAMES.CDRS]: 'bars',
  [ACCOUNT_INFO_ROUTE_NAMES.ACCOUNT]: 'line-chart',
  [ACCOUNT_INFO_ROUTE_NAMES.NETWORKS]: 'team',
  [ACCOUNT_INFO_ROUTE_NAMES.STATISTICS]: 'cluster',
};
