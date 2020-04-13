import {
  ACCOUNTS, STATISTICS_ROUTE_NAMES, CDRS, RATES, ACTIVE_CALLS, CHARTS_ROUTE_NAMES,
} from '@/constants';

export const currentAccountWatcher = (store) => {
  store.subscribe((mutation, state) => {
    if (mutation.type === ACCOUNTS.MUTATIONS.SET_CHOSEN_ACCOUNT_ID) {
      switch (state.route && state.route.name) {
        case STATISTICS_ROUTE_NAMES.CDRS:
          store.dispatch(CDRS.ACTIONS.GET_CDRS);
          break;
        case STATISTICS_ROUTE_NAMES.ACCOUNTS:
          // @todo changes this to "get particular account info"
          store.dispatch(ACCOUNTS.ACTIONS.GET_ACCOUNT_DETAILS);
          break;
        case STATISTICS_ROUTE_NAMES.RATES:
          store.dispatch(RATES.ACTIONS.GET_RATES);
          break;
        case CHARTS_ROUTE_NAMES.ACTIVE_CALLS:
          store.dispatch(ACTIVE_CALLS.ACTIONS.GET_ACTIVE_CALLS);
          break;
        default:
      }
    }
  });
};
