import Accounts from './Accounts';
import { requiresAuth, filterBlockedPages, beforeGuardEnchancer } from '../../router/helpers';

// eslint-disable-next-line
export const routes = [
  {
    path: '/accounts',
    name: 'accounts',
    component: Accounts,
    beforeEnter: beforeGuardEnchancer([requiresAuth, filterBlockedPages]),
  },
];
