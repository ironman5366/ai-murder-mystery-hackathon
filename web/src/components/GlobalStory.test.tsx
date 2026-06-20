import React from 'react';
import { render, screen } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import GlobalStory from './GlobalStory';
import { MysteryProvider } from '../providers/mysteryContext';

const renderWithProviders = (ui: React.ReactElement) =>
  render(
    <MantineProvider>
      <MysteryProvider>{ui}</MysteryProvider>
    </MantineProvider>
  );

test('renders global story title', () => {
  renderWithProviders(<GlobalStory />);
  expect(screen.getByText('globalStory')).toBeInTheDocument();
});
