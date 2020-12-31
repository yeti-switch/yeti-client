import Api from 'devour-client';
import { RESOURCES } from '@/constants';
import JsonApi from '../index';

describe('JsonApi', () => {
  it('will be initialized properly', () => {
    const addRelationshipSpy = jest.spyOn(JsonApi.prototype, 'addRelationship');
    const numberOfRelationships = Object.values(RESOURCES).length;

    expect(JsonApi.apiInstance).toBeInstanceOf(JsonApi);
    // TODO in this assert we can see that naming and service init
    // aren't the best
    expect(JsonApi.apiInstance.instance).toBeInstanceOf(Api);

    expect(addRelationshipSpy).toHaveBeenCalledTimes(numberOfRelationships);
    addRelationshipSpy.mockRestore();
  });
});
