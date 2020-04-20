export const ACCOUNTS = {
  MUTATIONS: {
    SET_ACCOUNT_DETAILS: 'setAccountDetails',
    SET_ACCOUNTS: 'setAccounts',
    SAVE_ACCOUNTS_FILTER: 'saveAccountsFilter',
    SET_CHOSEN_ACCOUNT_ID: 'setChosenAccountId',
  },
  ACTIONS: {
    GET_ACCOUNT_DETAILS: 'getAccountDetails',
    GET_ACCOUNTS: 'getAccounts',
    SET_ACCOUNTS_FILTER: 'setAccountsFilter',
    SET_CHOSEN_ACCOUNT_ID: 'setChosenAccountId',
  },
};

export const CDRS = {
  MUTATIONS: {
    SET_CDRS: 'setCdrs',
    SAVE_CDRS_FILTER: 'saveCdrsFilter',
  },
  ACTIONS: {
    GET_CDRS: 'getCdrs',
    SET_CDRS_FILTER: 'setCdrsFilter',
  },
};

export const STATISTICS = {
  MUTATIONS: {
    SET_STATISTICS: 'setStatistics',
  },
  ACTIONS: {
    GET_STATISTICS: 'getStatistics',
  },
};

export const RATES = {
  MUTATIONS: {
    SET_RATES: 'setRates',
    SAVE_RATES_FILTER: 'saveRatesFilter',
  },
  ACTIONS: {
    GET_RATES: 'getRates',
    SET_RATES_FILTER: 'setRatesFilter',
  },
};

export const AUTH = {
  MUTATIONS: {
    AUTH_SUCCESS: 'authSuccess',
    LOGOUT: 'logout',
  },
  ACTIONS: {
    AUTH_REQUEST: 'authRequest',
    LOCAL_AUTH: 'localAuth',
    LOGOUT: 'logout',
  },
};

export const TIME_RANGE_FILTER = {
  MUTATIONS: {
    SET_VALUE: 'setValue',
  },
  ACTIONS: {
    FILTER_SET: 'filterSet',
    FILTER_RESET: 'filterReset',
  },
};

export const NETWORK_SERVICE = {
  MUTATIONS: {
    SWITCH_PENDING_STATE: 'switchPendingState',
  },
  ACTIONS: {
    SWITCH_PENDING_STATE: 'switchPendingState',
  },
};
