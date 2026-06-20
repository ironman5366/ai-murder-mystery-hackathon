import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import EndModal from './EndModal';

const renderWithMantine = (ui: React.ReactElement) =>
  render(<MantineProvider>{ui}</MantineProvider>);

test('renders end title when opened', () => {
  renderWithMantine(<EndModal opened={true} onClose={() => {}} />);
  expect(screen.getByText('endTitle')).toBeInTheDocument();
  expect(screen.getByText('endLine1')).toBeInTheDocument();
  expect(screen.getByText('endLine2')).toBeInTheDocument();
  expect(screen.getByText('gotIt')).toBeInTheDocument();
});

test('renders pink elephant link', () => {
  renderWithMantine(<EndModal opened={true} onClose={() => {}} />);
  expect(screen.getByText('pinkElephant')).toBeInTheDocument();
});

test('renders GitHub link', () => {
  renderWithMantine(<EndModal opened={true} onClose={() => {}} />);
  expect(screen.getByText('github')).toBeInTheDocument();
});

test('calls onClose when button clicked', () => {
  const onClose = jest.fn();
  renderWithMantine(<EndModal opened={true} onClose={onClose} />);
  fireEvent.click(screen.getByText('gotIt'));
  expect(onClose).toHaveBeenCalled();
});

test('does not render content when closed', () => {
  renderWithMantine(<EndModal opened={false} onClose={() => {}} />);
  expect(screen.queryByText('endTitle')).not.toBeInTheDocument();
});
