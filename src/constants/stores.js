export const ACCOUNTS = {
  MUTATIONS: {
    SET_REQUEST_PENDING: 'setRequestPending',
    SET_ACCOUNTS: 'setAccounts',
    SAVE_ACCOUNTS_FILTER: 'saveAccountsFilter',
  },
  ACTIONS: {
    GET_ACCOUNTS: 'getAccounts',
    SET_ACCOUNTS_FILTER: 'setAccountsFilter',
  },
};

export const CDRS = {
  MUTATIONS: {
    SET_REQUEST_PENDING: 'setRequestPending',
    SET_CDRS: 'setCdrs',
    SET_ERROR: 'setError',
    SAVE_CDRS_FILTER: 'saveCdrsFilter',
  },
  ACTIONS: {
    GET_CDRS: 'getCdrs',
    SET_CDRS_FILTER: 'setCdrsFilter',
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
    SET_ERROR: 'setError',
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
