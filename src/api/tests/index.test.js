import { RESOURCES } from '@/constants';
import JsonApi from '../index';

describe('JsonApi', () => {
  it('will be initialized in proper order', () => {
    const addRelationshipSpy = jest.spyOn(JsonApi.prototype, 'addRelationship');
    const numberOfRelationships = Object.values(RESOURCES).length;

    expect(JsonApi.apiInstance).toBeInstanceOf(JsonApi);

    expect(addRelationshipSpy).toHaveBeenCalledTimes(numberOfRelationships);
    addRelationshipSpy.mockRestore();
  });
});
