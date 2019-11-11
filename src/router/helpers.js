import store from '../store/store';

export const requiresAuth = (to) => ({
  allowed: store.getters.isAuthenticated,
  routeInfo: {
    path: '/login',
    query: {
      redirect: to.fullPath,
    },
  },
});

export const requiresNotAuth = () => ({
  allowed: !store.getters.isAuthenticated,
  routeInfo: '/',
});

export const filterBlockedPages = () => ({
  allowed: !store.getters.blockedPages.has('rates'),
  routeInfo: '/',
});


export const beforeGuardEnchancer = (guardsArray) => (to, from, next) => {
  const quardsResult = guardsArray.find((guard) => !guard(to, from).allowed);


  if (quardsResult) {
    next(quardsResult(to, from).routeInfo);
    return;
  }

  next();
};
