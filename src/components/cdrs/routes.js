import Cdrs from './Cdrs';
import { requiresAuth, filterBlockedPages, beforeGuardEnchancer } from '../../router/helpers';

// eslint-disable-next-line
export const routes = [
  {
    path: '/cdrs',
    name: 'cdrs',
    component: Cdrs,
    beforeEnter: beforeGuardEnchancer([requiresAuth, filterBlockedPages]),
  },
];
