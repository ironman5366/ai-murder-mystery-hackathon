import React from 'react';
import { render, screen } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import ActorImage from './ActorImage';

const renderWithMantine = (ui: React.ReactElement) =>
  render(<MantineProvider>{ui}</MantineProvider>);

const mockActor = {
  id: 0,
  name: 'Test Actor',
  bio: '',
  personality: '',
  context: '',
  secret: '',
  violation: '',
  image: 'officer.png',
  messages: [],
};

test('renders actor image', () => {
  renderWithMantine(<ActorImage actor={mockActor} />);
  const img = screen.getByRole('img');
  expect(img).toBeInTheDocument();
  expect(img).toHaveAttribute('src');
});
