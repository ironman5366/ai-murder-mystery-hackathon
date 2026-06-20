import React from 'react';
import { render, screen } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import TextArea from './TextArea';

const renderWithMantine = (ui: React.ReactElement) =>
  render(<MantineProvider>{ui}</MantineProvider>);

test('renders notes section title', () => {
  renderWithMantine(<TextArea />);
  expect(screen.getByText('yourNotes')).toBeInTheDocument();
});
