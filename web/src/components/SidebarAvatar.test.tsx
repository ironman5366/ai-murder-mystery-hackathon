import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import SidebarAvatar from './SidebarAvatar';

jest.mock('./ActorImage', () => ({
  __esModule: true,
  default: () => <div data-testid="actor-image" />,
}));

const mockActor = {
  id: 1,
  name: 'Test Character',
  bio: 'Test bio',
  personality: 'Test personality',
  context: 'Test context',
  secret: 'Test secret',
  violation: 'Test violation',
  image: 'test.png',
  messages: [],
};

const renderWithMantine = (ui: React.ReactElement) =>
  render(<MantineProvider>{ui}</MantineProvider>);

test('renders actor name', () => {
  renderWithMantine(
    <SidebarAvatar actor={mockActor} currentActor={0} setCurrentActor={jest.fn()} postGame={false} />
  );
  expect(screen.getByText('Test Character')).toBeInTheDocument();
});

test('highlights active actor', () => {
  const { container } = renderWithMantine(
    <SidebarAvatar actor={mockActor} currentActor={1} setCurrentActor={jest.fn()} postGame={false} />
  );
  const group = container.querySelector('.mantine-Group-root');
  expect(group?.getAttribute('style')).toContain('lightblue');
});

test('does not highlight inactive actor', () => {
  const { container } = renderWithMantine(
    <SidebarAvatar actor={mockActor} currentActor={2} setCurrentActor={jest.fn()} postGame={false} />
  );
  const group = container.querySelector('.mantine-Group-root');
  expect(group?.getAttribute('style')).toContain('transparent');
});

test('calls setCurrentActor on click when not postGame', () => {
  const setCurrentActor = jest.fn();
  renderWithMantine(
    <SidebarAvatar actor={mockActor} currentActor={0} setCurrentActor={setCurrentActor} postGame={false} />
  );
  fireEvent.click(screen.getByText('Test Character'));
  expect(setCurrentActor).toHaveBeenCalledWith(1);
});

test('does not call setCurrentActor on click when postGame', () => {
  const setCurrentActor = jest.fn();
  renderWithMantine(
    <SidebarAvatar actor={mockActor} currentActor={0} setCurrentActor={setCurrentActor} postGame={true} />
  );
  fireEvent.click(screen.getByText('Test Character'));
  expect(setCurrentActor).not.toHaveBeenCalled();
});
