import * as date from './date/date';
import * as response from './normalizers/response';
import storeModules from './storeModules/index';
import tableDataNormalizers from './tableDataNormalizers/index';

export default {
  ...date,
  ...response,
  ...tableDataNormalizers,
  ...storeModules,
};
