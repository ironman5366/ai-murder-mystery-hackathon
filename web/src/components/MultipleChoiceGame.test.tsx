import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import MultipleChoiceGame from './MultipleChoiceGame';

const renderWithMantine = (ui: React.ReactElement) =>
  render(<MantineProvider>{ui}</MantineProvider>);

test('renders first question', () => {
  renderWithMantine(
    <MultipleChoiceGame onBackToGame={jest.fn()} onResumeGame={jest.fn()} />
  );
  expect(screen.getByText('question1')).toBeInTheDocument();
});

test('renders choice options for first question', () => {
  renderWithMantine(
    <MultipleChoiceGame onBackToGame={jest.fn()} onResumeGame={jest.fn()} />
  );
  expect(screen.getByText('choiceViolentJerry')).toBeInTheDocument();
  expect(screen.getByText('choiceManagerPatricia')).toBeInTheDocument();
  expect(screen.getByText('choiceSolitaryHannah')).toBeInTheDocument();
  expect(screen.getByText('choiceAmateurLarry')).toBeInTheDocument();
  expect(screen.getByText('choiceInnocentKim')).toBeInTheDocument();
});

test('next button is disabled when no choice selected', () => {
  renderWithMantine(
    <MultipleChoiceGame onBackToGame={jest.fn()} onResumeGame={jest.fn()} />
  );
  const btn = screen.getByRole('button', { name: 'nextQuestion' });
  expect(btn).toBeDisabled();
});

test('next button enables after selecting a choice', () => {
  renderWithMantine(
    <MultipleChoiceGame onBackToGame={jest.fn()} onResumeGame={jest.fn()} />
  );
  fireEvent.click(screen.getByText('choiceViolentJerry'));
  const btn = screen.getByRole('button', { name: 'nextQuestion' });
  expect(btn).not.toBeDisabled();
});

test('moves to second question after clicking next', () => {
  renderWithMantine(
    <MultipleChoiceGame onBackToGame={jest.fn()} onResumeGame={jest.fn()} />
  );
  fireEvent.click(screen.getByText('choiceViolentJerry'));
  fireEvent.click(screen.getByText('nextQuestion'));
  expect(screen.getByText('question2')).toBeInTheDocument();
});

test('calls onResumeGame when back button clicked', () => {
  const onResumeGame = jest.fn();
  renderWithMantine(
    <MultipleChoiceGame onBackToGame={jest.fn()} onResumeGame={onResumeGame} />
  );
  fireEvent.click(screen.getByText('back'));
  expect(onResumeGame).toHaveBeenCalled();
});

test('calls onBackToGame after completing all questions', () => {
  const onBackToGame = jest.fn();
  renderWithMantine(
    <MultipleChoiceGame onBackToGame={onBackToGame} onResumeGame={jest.fn()} />
  );

  // Question 1
  fireEvent.click(screen.getByText('choiceViolentJerry'));
  fireEvent.click(screen.getByText('nextQuestion'));

  // Question 2
  fireEvent.click(screen.getByText('motiveBucketMafia'));
  fireEvent.click(screen.getByText('nextQuestion'));

  // Question 3 (final)
  expect(screen.getByText('question3')).toBeInTheDocument();
  expect(screen.getByText('finish')).toBeInTheDocument();
  fireEvent.click(screen.getByText('choiceInnocentKim'));
  fireEvent.click(screen.getByText('finish'));

  expect(onBackToGame).toHaveBeenCalledWith([
    'Violent Jerry',
    'Hired to kill from the Bucket Mafia',
    'Innocent Kim',
  ]);
});
