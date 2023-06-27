import * as chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import sinonChai from 'sinon-chai';
import { PactV3, MatchersV3, LogLevel } from '@pact-foundation/pact';
import { getUser } from '../services/getUser';
const { like } = MatchersV3;
const LOG_LEVEL = process.env.LOG_LEVEL || 'TRACE';

const expect = chai.expect;

chai.use(sinonChai);
chai.use(chaiAsPromised);

describe('The Users API', () => {

  // Setup the 'pact' between two applications
  const provider = new PactV3({
    consumer: 'UserWeb',
    provider: 'UserAPI',
    logLevel: LOG_LEVEL as LogLevel
  });
  const userExample = { id: 1, name: 'Homer Simpson' };
  const EXPECTED_BODY = like(userExample);

  describe('get /users/:id', () => {
    it('returns the requested user', () => {
      // Arrange
      provider
        .given('a user with ID 1 exists')
        .uponReceiving('a request to get a user')
        .withRequest({
          method: 'GET',
          path: '/users/1',
        })
        .willRespondWith({
          status: 200,
          headers: { 'content-type': 'application/json' },
          body: EXPECTED_BODY,
        });

      return provider.executeTest(async (mockserver) => {
        // Act
        const response = await getUser(mockserver.url, 1);

        // Assert
        expect(response.data).to.deep.eq(userExample);
      });
    });
  });
});