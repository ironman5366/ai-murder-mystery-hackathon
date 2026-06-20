import React from 'react';
import { render, screen } from '@testing-library/react';
import { SessionProvider, useSessionContext } from './sessionContext';

const SESSION_KEY = 'MYSTERY_SESSION';

beforeEach(() => {
  localStorage.clear();
});

const TestComponent = () => {
  const sessionId = useSessionContext();
  return <div data-testid="session-id">{sessionId}</div>;
};

test('creates new session id when none in localStorage', () => {
  render(
    <SessionProvider>
      <TestComponent />
    </SessionProvider>
  );
  const el = screen.getByTestId('session-id');
  expect(el.textContent).toBe('test-session-id');
  expect(localStorage.getItem(SESSION_KEY)).toBe('test-session-id');
});

test('uses existing session id from localStorage', () => {
  localStorage.setItem(SESSION_KEY, 'existing-session-123');
  render(
    <SessionProvider>
      <TestComponent />
    </SessionProvider>
  );
  const el = screen.getByTestId('session-id');
  expect(el.textContent).toBe('existing-session-123');
});
