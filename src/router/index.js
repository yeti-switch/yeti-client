import VueRouter from 'vue-router';

import Login from '../components/Login';
import NotFound from '../components/NotFound';
import { routes as CdrsRoutes } from '../components/cdrs/routes';
import { routes as RatesRoutes } from '../components/rates/routes';
import { routes as AccountsRoutes } from '../components/accounts/routes';
import Home from '../components/Home';
import { requiresAuth, requiresNotAuth, beforeGuardEnchancer } from './helpers';
import { GENERAL_ROUTE_NAMES, GENERAL_PATHS } from '../constants/routing';

const staticRoutes = [
  {
    path: '/',
    redirect: {
      name: GENERAL_ROUTE_NAMES.HOME,
    },
  },
  {
    path: GENERAL_PATHS.LOG_IN,
    name: GENERAL_ROUTE_NAMES.LOG_IN,
    component: Login,
    beforeEnter: beforeGuardEnchancer([requiresNotAuth]),
  },
  {
    path: GENERAL_PATHS.NOT_FOUND,
    name: GENERAL_ROUTE_NAMES.NOT_FOUND,
    component: NotFound,
  },
  {
    path: GENERAL_PATHS.HOME,
    name: GENERAL_ROUTE_NAMES.HOME,
    component: Home,
    beforeEnter: beforeGuardEnchancer([requiresAuth]),
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
];

export class Router {
  static routes = staticRoutes;

  instance = new VueRouter();

  constructor() {
    this.addRoutes(Router.routes);
  }

  addRoutes = (routes) => {
    this.instance.addRoutes(routes);
  };
}

export const router = new Router();
