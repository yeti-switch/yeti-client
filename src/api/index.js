import Api from 'devour-client';

import {
  AUTH,
  NETWORK_SERVICE, NOTIFICATION_TYPES, RELATIONSHIPS, RESOURCES, GENERAL_PATHS,
} from '../constants';

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

  static getNetworkErrorMiddleware = (notify, storeDispatch) => ({
    name: 'error-notify',
    error: (payload) => {
      console.log(111);
      notify({
        type: NOTIFICATION_TYPES.ERROR,
        title: payload[0].title,
        text: payload[0].detail,
      });

      storeDispatch(NETWORK_SERVICE.ACTIONS.SWITCH_PENDING_STATE, false);

      return payload;
    },
  });

  static getNetworkAuthErrorMiddleware = (push, storeDispatch) => ({
    name: 'auth-redirect',
    error: (payload) => {
      console.log(222);
      if (payload[0].title === 'Authorization failed') {
        storeDispatch(AUTH.ACTIONS.LOGOUT);
        push(GENERAL_PATHS.LOGIN);
      }

      return payload;
    },
  });

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

  insertNetworkErrorMiddleware = (notify, storeDispatch) => {
    const middleware = JsonApi.getNetworkErrorMiddleware(notify, storeDispatch);
    this.instance.insertMiddlewareAfter('errors', middleware);
  }

  insertNetworkAuthErrorMiddleware = (push, storeDispatch) => {
    const middleware = JsonApi.getNetworkAuthErrorMiddleware(push, storeDispatch);
    this.instance.insertMiddlewareAfter('errors', middleware);
  }
}
