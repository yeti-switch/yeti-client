import * as date from './date/date';
import storeModules from './storeModules/index';
import tableDataNormalizers from './tableDataNormalizers/index';

export default {
  ...date,
  ...tableDataNormalizers,
  ...storeModules,
};
