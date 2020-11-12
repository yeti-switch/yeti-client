import Api from 'devour-client';

import { RELATIONSHIPS, RESOURCES } from '../constants';

export default class JsonApi {
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

  static get apiInstance() {
    if (typeof this.jsonApiInstance === 'undefined') {
      this.jsonApiInstance = new JsonApi();
    }
    return this.jsonApiInstance;
  }

  constructor() {
    try {
      this.instance = new Api({
        apiUrl: `${YETI_CONFIG.yeti.apiBaseUrl}/api/rest/customer/v1`,
        pluralize: false,
      });
    } catch (e) {
      throw new Error(`Api was not initialized due to error: ${e}. Please check your config file.`);
    }

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

  findAllResources = (resourceName, params) => this.instance.findAll(resourceName, params);

  findOneResource = (resourceName, id, params) => this.instance.find(resourceName, id, params);

  createResource = (resourceName, data) => this.instance.create(resourceName, data);

  setToken = (token) => {
    this.instance.headers.Authorization = `Bearer ${token}`;
  };
}
