import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import IntroModal from './IntroModal';

const renderWithMantine = (ui: React.ReactElement) =>
  render(<MantineProvider>{ui}</MantineProvider>);

test('renders welcome title when opened', () => {
  renderWithMantine(<IntroModal opened={true} onClose={() => {}} />);
  expect(screen.getByText('welcomeTitle')).toBeInTheDocument();
});

test('renders intro text lines when opened', () => {
  renderWithMantine(<IntroModal opened={true} onClose={() => {}} />);
  expect(screen.getByText('introLine1')).toBeInTheDocument();
  expect(screen.getByText('introLine2')).toBeInTheDocument();
  expect(screen.getByText('letsPlay')).toBeInTheDocument();
});

test('calls onClose when button clicked', () => {
  const onClose = jest.fn();
  renderWithMantine(<IntroModal opened={true} onClose={onClose} />);
  fireEvent.click(screen.getByText('letsPlay'));
  expect(onClose).toHaveBeenCalled();
});

test('does not render modal content when closed', () => {
  renderWithMantine(<IntroModal opened={false} onClose={() => {}} />);
  expect(screen.queryByText('welcomeTitle')).not.toBeInTheDocument();
  expect(screen.queryByText('letsPlay')).not.toBeInTheDocument();
});
