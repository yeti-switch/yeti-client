import Api from 'devour-client';

import { RELATIONSHIPS, RESOURCES } from '../static/constants/api';

export class JsonApi {
  constructor() {
    this.instance = new Api({
      apiUrl: `${CONFIG.yeti.apiBaseUrl}/api/rest/customer/v1`,
    });

    this.initializeResources();
  }

  initializeResources = () => {
    Object.values(RESOURCES).forEach((resource) => {
      this.addRelationship(resource);
    });
  };

  addRelationship = (resource) => {
    this.instance.define(resource, RELATIONSHIPS[resource]);
  };

  findAllResources = ({ resourceName, filter, page }) =>
    this.instance.findAll(resourceName, { filter, page });

  setToken = (token) => {
    this.instance.headers.Authorization = `Bearer ${token}`;
  };
}

export const jsonApi = new JsonApi();
