import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

beforeEach(() => {
  localStorage.clear();
});

test('renders app title', () => {
  render(<App />);
  expect(screen.getByText('appTitle')).toBeInTheDocument();
});

test('renders intro modal by default', () => {
  render(<App />);
  expect(screen.getByText('welcomeTitle')).toBeInTheDocument();
  expect(screen.getByText('letsPlay')).toBeInTheDocument();
});

test('closes intro modal and shows game buttons', async () => {
  render(<App />);
  fireEvent.click(screen.getByText('letsPlay'));
  await waitFor(() => {
    expect(screen.queryByText('welcomeTitle')).not.toBeInTheDocument();
  });
  expect(screen.getByText('endGame')).toBeInTheDocument();
  expect(screen.getByText('learnMore')).toBeInTheDocument();
  expect(screen.getByText('spoilers')).toBeInTheDocument();
});
