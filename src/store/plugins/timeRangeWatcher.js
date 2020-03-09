import {
  STATISTICS_ROUTE_NAMES, CDRS, TIME_RANGE_FILTER, ACTIVE_CALLS, CHARTS_ROUTE_NAMES,
} from '../../constants';

// eslint-disable-next-line
export const timeRangeWatcher = (store) => {
  store.subscribe((mutation, state) => {
    if (mutation.type === TIME_RANGE_FILTER.MUTATIONS.SET_VALUE) {
      switch (state.route && state.route.name) {
        case STATISTICS_ROUTE_NAMES.CDRS:
          store.dispatch(CDRS.ACTIONS.GET_CDRS);
          break;
        case CHARTS_ROUTE_NAMES.ACTIVE_CALLS:
          store.dispatch(ACTIVE_CALLS.ACTIONS.GET_ACTIVE_CALLS);
          break;
        default:
      }
    }
  });
};
