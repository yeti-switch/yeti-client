import * as date from './date/date';
import * as response from './normalizers/response';
import tableDataNormalizers from './tableDataNormalizers/index';

export default {
  ...date,
  ...response,
  ...tableDataNormalizers,
};
