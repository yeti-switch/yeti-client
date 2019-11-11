import Rates from './Rates';
import { requiresAuth, filterBlockedPages, beforeGuardEnchancer } from '../../router/helpers';

// eslint-disable-next-line
export const routes = [
  {
    path: '/rates',
    name: 'rates',
    component: Rates,
    beforeEnter: beforeGuardEnchancer([requiresAuth, filterBlockedPages]),
  },
];
