import store from '../store/store';
import { GENERAL_PATHS } from '../constants/routing';

export const requiresAuth = (to) => ({
  allowed: store.getters.isAuthenticated,
  nextRouteInfo: {
    path: GENERAL_PATHS.LOG_IN,
    query: {
      redirect: to.fullPath,
    },
  },
});

export const requiresNotAuth = () => ({
  allowed: !store.getters.isAuthenticated,
  nextRouteInfo: '/',
});

export const filterBlockedPages = (to) => ({
  allowed: !store.getters.blockedPages.has(to.name),
  nextRouteInfo: '/',
});

export const beforeGuardEnchancer = (guardsArray) => (to, from, next) => {
  const guardsResult = guardsArray.find((guard) => !guard(to, from).allowed);

  if (guardsResult) {
    next(guardsResult(to, from).nextRouteInfo);
    return;
  }

  next();
};
