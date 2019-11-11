import VueRouter from 'vue-router';

import Login from '../components/Login';
import NotFound from '../components/NotFound';
import { routes as CdrsRoutes } from '../components/cdrs/routes';
import { routes as RatesRoutes } from '../components/rates/routes';
import { routes as AccountsRoutes } from '../components/accounts/routes';
import Home from '../components/Home';
import { requiresAuth, requiresNotAuth, beforeGuardEnchancer } from './helpers';


const staticRoutes = [
  {
    path: '/',
    redirect: {
      name: 'home',
    },
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    beforeEnter: beforeGuardEnchancer([requiresNotAuth]),
  },
  {
    path: '/404',
    name: 'notfound',
    component: NotFound,
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    beforeEnter: beforeGuardEnchancer([requiresAuth]),
  },
  {
    path: '*',
    redirect: {
      name: 'notfound',
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
