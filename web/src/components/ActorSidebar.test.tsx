import React from 'react';
import { render, screen } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import ActorSidebar from './ActorSidebar';

jest.mock('./SidebarAvatar', () => ({
  __esModule: true,
  default: ({ actor }: { actor: { name: string } }) => (
    <div data-testid="sidebar-avatar">{actor.name}</div>
  ),
}));

const mockActors = [
  { id: 0, name: 'Actor A', bio: '', personality: '', context: '', secret: '', violation: '', image: '', messages: [] },
  { id: 1, name: 'Actor B', bio: '', personality: '', context: '', secret: '', violation: '', image: '', messages: [] },
];

const renderWithMantine = (ui: React.ReactElement) =>
  render(<MantineProvider>{ui}</MantineProvider>);

test('renders all actors', () => {
  renderWithMantine(
    <ActorSidebar currentActor={0} setCurrentActor={jest.fn()} actors={mockActors} postGame={false} />
  );
  expect(screen.getByText('Actor A')).toBeInTheDocument();
  expect(screen.getByText('Actor B')).toBeInTheDocument();
});

test('renders nothing when no actors', () => {
  renderWithMantine(
    <ActorSidebar currentActor={0} setCurrentActor={jest.fn()} actors={[]} postGame={false} />
  );
  expect(screen.queryByTestId('sidebar-avatar')).not.toBeInTheDocument();
});
