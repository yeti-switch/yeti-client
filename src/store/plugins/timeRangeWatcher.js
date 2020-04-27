import {
  ACCOUNT_INFO_ROUTE_NAMES, CDRS, TIME_RANGE_FILTER, STATISTICS,
} from '@/constants';

export const timeRangeWatcher = (store) => {
  store.subscribe((mutation, state) => {
    if (mutation.type === TIME_RANGE_FILTER.MUTATIONS.SET_VALUE) {
      switch (state.route && state.route.name) {
        case ACCOUNT_INFO_ROUTE_NAMES.CDRS:
          store.dispatch(CDRS.ACTIONS.GET_CDRS);
          break;
        case ACCOUNT_INFO_ROUTE_NAMES.STATISTICS:
          store.dispatch(STATISTICS.ACTIONS.GET_STATISTICS);
          break;
        default:
      }
    }
  });
};
