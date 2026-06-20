import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import ActorChat from './Actor';

jest.mock('../providers/mysteryContext', () => ({
  useMysteryContext: () => ({
    setActors: jest.fn(),
    globalStory: 'A mysterious story',
  }),
}));

jest.mock('../providers/sessionContext', () => ({
  useSessionContext: () => 'test-session-id',
}));

jest.mock('../api/invoke', () => ({
  __esModule: true,
  default: jest.fn().mockResolvedValue({ final_response: 'Hello detective!' }),
}));

jest.mock('../characters.json', () => ({
  fileKey: 'stock-characters::v1',
}));

jest.mock('./ActorImage', () => ({
  __esModule: true,
  default: () => <div data-testid="actor-image" />,
}));

const renderWithMantine = (ui: React.ReactElement) =>
  render(<MantineProvider>{ui}</MantineProvider>);

const baseActor = {
  id: 0,
  name: 'Detective Fox',
  bio: 'A sly investigator.',
  personality: '',
  context: '',
  secret: '',
  violation: '',
  image: 'fox.png',
  messages: [],
};

test('renders actor name and bio', () => {
  renderWithMantine(<ActorChat actor={baseActor} />);
  expect(screen.getByText('Detective Fox')).toBeInTheDocument();
  expect(screen.getByText('A sly investigator.')).toBeInTheDocument();
});

test('renders existing messages', () => {
  const actorWithMsgs = {
    ...baseActor,
    messages: [
      { role: 'assistant', content: 'I know nothing!' },
    ],
  };
  renderWithMantine(<ActorChat actor={actorWithMsgs} />);
  expect(screen.getByText(/I know nothing/)).toBeInTheDocument();
});

test('shows send button and input', () => {
  renderWithMantine(<ActorChat actor={baseActor} />);
  expect(screen.getByPlaceholderText(/talkTo/)).toBeInTheDocument();
  expect(screen.getByText('send')).toBeInTheDocument();
});

test('input value updates on typing', () => {
  renderWithMantine(<ActorChat actor={baseActor} />);
  const input = screen.getByPlaceholderText(/talkTo/) as HTMLInputElement;
  fireEvent.change(input, { target: { value: 'Who did it?' } });
  expect(input.value).toBe('Who did it?');
});
