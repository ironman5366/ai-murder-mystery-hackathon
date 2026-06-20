import React from 'react';
import { render, screen } from '@testing-library/react';
import { MysteryProvider, useMysteryContext } from './mysteryContext';

const TestComponent = () => {
  const { actors, globalStory } = useMysteryContext();
  const actorList = Object.values(actors);
  return (
    <div>
      <span data-testid="actor-count">{actorList.length}</span>
      <span data-testid="first-actor">{actorList[0]?.name}</span>
      <span data-testid="global-story">{globalStory.substring(0, 20)}</span>
    </div>
  );
};

test('provides 6 actors from characters.json', () => {
  render(<MysteryProvider><TestComponent /></MysteryProvider>);
  expect(screen.getByTestId('actor-count').textContent).toBe('6');
});

test('provides non-empty globalStory', () => {
  render(<MysteryProvider><TestComponent /></MysteryProvider>);
  const story = screen.getByTestId('global-story').textContent;
  expect(story).toBeTruthy();
  expect(story?.length).toBeGreaterThan(0);
});
