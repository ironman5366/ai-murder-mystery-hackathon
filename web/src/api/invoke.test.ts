import invokeAI from './invoke';

const mockFetch = jest.fn();
global.fetch = mockFetch;

const baseActor = {
  id: 0, name: 'Test', bio: '', personality: '',
  context: '', secret: '', violation: '', image: '', messages: [],
};

beforeEach(() => {
  mockFetch.mockReset();
});

test('calls /invoke/ endpoint with POST', async () => {
  mockFetch.mockResolvedValueOnce({ json: () => Promise.resolve({}) });
  await invokeAI({ globalStory: 'S', actor: baseActor, sessionId: 's', characterFileVersion: 'v1' });
  expect(mockFetch).toHaveBeenCalledTimes(1);
  expect(mockFetch.mock.calls[0][0]).toContain('/invoke/');
  expect(mockFetch.mock.calls[0][1].method).toBe('POST');
});

test('sends correct JSON body', async () => {
  mockFetch.mockResolvedValueOnce({ json: () => Promise.resolve({}) });
  await invokeAI({ globalStory: 'Story', actor: baseActor, sessionId: 'abc', characterFileVersion: 'v1' });
  const body = JSON.parse(mockFetch.mock.calls[0][1].body);
  expect(body.global_story).toBe('Story');
  expect(body.session_id).toBe('abc');
  expect(body.character_file_version).toBe('v1');
});

test('returns parsed JSON response', async () => {
  const response = { original_response: '', critique_response: '', problems_detected: false, final_response: 'Hi', refined_response: '' };
  mockFetch.mockResolvedValueOnce({ json: () => Promise.resolve(response) });
  const result = await invokeAI({ globalStory: 'S', actor: baseActor, sessionId: 's', characterFileVersion: 'v1' });
  expect(result).toEqual(response);
});
