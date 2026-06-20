import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import SecretsModal from './SecretsModal';

const renderWithMantine = (ui: React.ReactElement) =>
  render(<MantineProvider>{ui}</MantineProvider>);

test('renders spoilers title when opened', () => {
  renderWithMantine(<SecretsModal opened={true} onClose={() => {}} postGame={false} />);
  expect(screen.getByText('spoilers')).toBeInTheDocument();
});

test('calls onClose when button clicked', () => {
  const onClose = jest.fn();
  renderWithMantine(<SecretsModal opened={true} onClose={onClose} postGame={false} />);
  fireEvent.click(screen.getByText('close'));
  expect(onClose).toHaveBeenCalled();
});

test('does not render modal content when closed', () => {
  renderWithMantine(<SecretsModal opened={false} onClose={() => {}} postGame={false} />);
  expect(screen.queryByText('spoilers')).not.toBeInTheDocument();
});
