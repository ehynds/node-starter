'use strict';

describe('controllers/app', () => {
  let agent;
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    agent = supertest.agent(app);
  });

  afterEach(() => {
    nock.cleanAll();
    sandbox.restore();
  });

  describe('healthcheck', () => {
    it('returns a 200', () => {
      return agent
        .get('/healthcheck')
        .expect('content-type', 'application/json; charset=utf-8')
        .expect(200);
    });
  });
});
