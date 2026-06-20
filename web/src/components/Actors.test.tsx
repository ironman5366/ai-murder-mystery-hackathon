import React from 'react';
import { render, screen } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import Actors from './Actors';

jest.mock('../providers/mysteryContext', () => ({
  useMysteryContext: () => ({
    actors: {
      0: { id: 0, name: 'Alpha', bio: '', personality: '', context: '', secret: '', violation: '', image: '', messages: [] },
      1: { id: 1, name: 'Beta', bio: '', personality: '', context: '', secret: '', violation: '', image: '', messages: [] },
    },
  }),
}));

jest.mock('./Actor', () => ({
  __esModule: true,
  default: ({ actor }: { actor: { name: string } }) => (
    <div data-testid="actor-chat">{actor.name}</div>
  ),
}));

const renderWithMantine = (ui: React.ReactElement) =>
  render(<MantineProvider>{ui}</MantineProvider>);

test('renders actor count', () => {
  renderWithMantine(<Actors />);
  expect(screen.getByText('2 actors')).toBeInTheDocument();
});

test('renders all actor chat components', () => {
  renderWithMantine(<Actors />);
  const chats = screen.getAllByTestId('actor-chat');
  expect(chats).toHaveLength(2);
  expect(chats[0]).toHaveTextContent('Alpha');
  expect(chats[1]).toHaveTextContent('Beta');
});
