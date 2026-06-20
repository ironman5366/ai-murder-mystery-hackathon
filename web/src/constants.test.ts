const originalEnv = process.env;

beforeEach(() => {
  jest.resetModules();
  process.env = { ...originalEnv };
});

afterAll(() => {
  process.env = originalEnv;
});

test('uses REACT_APP_API_URL from env', () => {
  process.env.REACT_APP_API_URL = 'http://test-api.com';
  const { API_URL } = require('./constants');
  expect(API_URL).toBe('http://test-api.com');
});

test('is undefined when env not set', () => {
  delete process.env.REACT_APP_API_URL;
  const { API_URL } = require('./constants');
  expect(API_URL).toBeUndefined();
});
