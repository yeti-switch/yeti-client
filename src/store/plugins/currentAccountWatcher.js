import {
  ACCOUNTS, ACCOUNT_INFO_ROUTE_NAMES, CDRS, RATES, STATISTICS,
} from '@/constants';

export const currentAccountWatcher = (store) => {
  store.subscribe((mutation, state) => {
    if (mutation.type === ACCOUNTS.MUTATIONS.SET_CHOSEN_ACCOUNT_ID) {
      switch (state.route && state.route.name) {
        case ACCOUNT_INFO_ROUTE_NAMES.CDRS:
          store.dispatch(CDRS.ACTIONS.GET_CDRS);
          break;
        case ACCOUNT_INFO_ROUTE_NAMES.ACCOUNTS:
          // @todo changes this to "get particular account info"
          store.dispatch(ACCOUNTS.ACTIONS.GET_ACCOUNT_DETAILS);
          break;
        case ACCOUNT_INFO_ROUTE_NAMES.RATES:
          store.dispatch(RATES.ACTIONS.GET_RATES);
          break;
        case ACCOUNT_INFO_ROUTE_NAMES.STATISTICS:
          store.dispatch(STATISTICS.ACTIONS.GET_STATISTICS);
          break;
        default:
      }
    }
  });
};
