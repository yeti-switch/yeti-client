import Api from 'devour-client';

import { RELATIONSHIPS, RESOURCES } from '../constants';
// eslint-disable-next-line
import store from '../store/store';

export class JsonApi {
  static authDataReqTransformationMiddleware = {
    name: 'auth-data-transformation-req',
    req: (payload) => {
      if (payload.req.model === RESOURCES.AUTH) {
        payload.req.data = {
          auth: payload.req.data.data.attributes,
        };
      }

      return payload;
    },
  };

  static authDataResTransformationMiddleware = {
    name: 'auth-data-transformation-res',
    res: (payload) => {
      if (payload.req.model === RESOURCES.AUTH) {
        payload.res.data = {
          data: {
            type: RESOURCES.AUTH,
            attributes: payload.res.data,
          },
        };
      }

      return payload;
    },
  };

  constructor() {
    this.instance = new Api({
      apiUrl: `${store.getters.apiBaseUrl}/api/rest/customer/v1`,
      pluralize: false,
    });


    this.initializeResources();
    this.instance.insertMiddlewareBefore('axios-request', JsonApi.authDataReqTransformationMiddleware);
    this.instance.insertMiddlewareBefore('response', JsonApi.authDataResTransformationMiddleware);
  }


  initializeResources = () => {
    Object.values(RESOURCES).forEach((resource) => {
      this.addRelationship(resource);
    });
  };

  addRelationship = (resource) => {
    this.instance.define(resource, RELATIONSHIPS[resource]);
  };

  findAllResources = (resourceName, data) => this.instance.findAll(resourceName, data);

  findOneResource = (resourceName, id) => this.instance.find(resourceName, id);

  createResource = (resourceName, data) => this.instance.create(resourceName, data);

  setToken = (token) => {
    this.instance.headers.Authorization = `Bearer ${token}`;
  };
}

export const jsonApi = new JsonApi();
