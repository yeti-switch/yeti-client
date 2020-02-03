// eslint-disable-next-line
export const currentAccountWatcher = (store) => {
  store.subscribe((mutation, state) => {
    console.log(mutation, state, state.route);
  });
};
