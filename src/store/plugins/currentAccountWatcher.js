// eslint-disable-next-line
export const currentAccountWatcher = (store) => {
  store.subscribe(() => {
    console.log(1);
  });
};
