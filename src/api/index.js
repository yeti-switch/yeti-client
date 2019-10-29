import Api from 'devour-client';

import { RELATIONSHIPS, RESOURCES } from '../static/constants/api';

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
      apiUrl: `${CONFIG.yeti.apiBaseUrl}/api/rest/customer/v1`,
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

  setToken = (token) => {
    this.instance.headers.Authorization = `Bearer ${token}`;
  };

  createResource = (resourceName, data) => this.instance.create(resourceName, data)
}

export const jsonApi = new JsonApi();
