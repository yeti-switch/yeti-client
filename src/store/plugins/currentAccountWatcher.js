import {
  ACCOUNTS, STATISTICS_ROUTE_NAMES, CDRS, RATES,
} from '../../constants';

// eslint-disable-next-line
export const currentAccountWatcher = (store) => {
  store.subscribe((mutation, state) => {
    if (mutation.type === ACCOUNTS.MUTATIONS.SET_CHOSEN_ACCOUNT_ID) {
      switch (state.route && state.route.name) {
        case STATISTICS_ROUTE_NAMES.CDRS:
          store.dispatch(CDRS.ACTIONS.GET_CDRS);
          break;
        case STATISTICS_ROUTE_NAMES.ACCOUNTS:
          // @todo changes this to "get particular account info"
          store.dispatch(ACCOUNTS.ACTIONS.GET_ACCOUNTS);
          break;
        case STATISTICS_ROUTE_NAMES.RATES:
          store.dispatch(RATES.ACTIONS.GET_RATES);
          break;
        default:
      }
    }
  });
};
