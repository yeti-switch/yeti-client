import VueRouter from 'vue-router';

import Login from '../components/Login';
import NotFound from '../components/NotFound';
import { routes as CdrsRoutes } from '../components/cdrs/routes';
import { routes as RatesRoutes } from '../components/rates/routes';
import { routes as AccountsRoutes } from '../components/accounts/routes';
import { routes as StatisticsChartsRoutes } from '../components/StatisticsCharts/routes';
import { requiresNotAuth, beforeGuardEnchancer } from './helpers';
import { GENERAL_ROUTE_NAMES, GENERAL_PATHS, ACCOUNT_INFO_ROUTE_NAMES } from '../constants/routing';

const STATIC_ROUTES = [
  {
    path: '/',
    redirect: {
      name: ACCOUNT_INFO_ROUTE_NAMES.ACCOUNTS,
    },
  },
  {
    path: GENERAL_PATHS.LOG_IN,
    name: GENERAL_ROUTE_NAMES.LOG_IN,
    components: {
      [GENERAL_ROUTE_NAMES.LOG_IN]: Login,
    },
    beforeEnter: beforeGuardEnchancer([requiresNotAuth]),
  },
  {
    path: GENERAL_PATHS.NOT_FOUND,
    name: GENERAL_ROUTE_NAMES.NOT_FOUND,
    component: NotFound,
  },
  {
    path: '*',
    redirect: {
      name: GENERAL_ROUTE_NAMES.NOT_FOUND,
    },
  },
  ...RatesRoutes,
  ...CdrsRoutes,
  ...AccountsRoutes,
  ...StatisticsChartsRoutes,
];

export class Router {
  instance = new VueRouter();

  constructor() {
    this.addRoutes(STATIC_ROUTES);
  }

  addRoutes = (routes) => {
    this.instance.addRoutes(routes);
  };
}

export const router = new Router();
