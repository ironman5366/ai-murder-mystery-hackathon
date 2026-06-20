import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import ExplanationModal from './ExplanationModal';

const renderWithMantine = (ui: React.ReactElement) =>
  render(<MantineProvider>{ui}</MantineProvider>);

test('renders about game title when opened', () => {
  renderWithMantine(<ExplanationModal opened={true} onClose={() => {}} />);
  expect(screen.getByText('aboutGame')).toBeInTheDocument();
});

test('renders pink elephants section', () => {
  renderWithMantine(<ExplanationModal opened={true} onClose={() => {}} />);
  expect(screen.getByText('pinkElephantsTitle')).toBeInTheDocument();
  expect(screen.getByText(/pinkElephantsLine[12]/)).toBeInTheDocument();
});

test('renders author links', () => {
  renderWithMantine(<ExplanationModal opened={true} onClose={() => {}} />);
  expect(screen.getByText('Paul Scotti')).toBeInTheDocument();
  expect(screen.getByText('Will Beddow')).toBeInTheDocument();
});

test('calls onClose when button clicked', () => {
  const onClose = jest.fn();
  renderWithMantine(<ExplanationModal opened={true} onClose={onClose} />);
  fireEvent.click(screen.getByText('close'));
  expect(onClose).toHaveBeenCalled();
});

test('does not render content when closed', () => {
  renderWithMantine(<ExplanationModal opened={false} onClose={() => {}} />);
  expect(screen.queryByText('aboutGame')).not.toBeInTheDocument();
});
