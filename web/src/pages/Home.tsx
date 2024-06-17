// src/pages/Home.tsx

import React, { useState } from 'react';
import { AppShell, Burger, Button, Textarea } from '@mantine/core';
import Header from '../components/Header';
import ActorSidebar from '../components/ActorSidebar';
import ActorChat from '../components/Actor';
import IntroModal from '../components/IntroModal';
import { useDisclosure } from '@mantine/hooks';
import { useMysteryContext } from '../providers/mysteryContext';
import MultipleChoiceGame from '../components/MultipleChoiceGame';

export default function Home() {
  const { actors } = useMysteryContext();
  const [currActor, setCurrActor] = useState<number>(0);
  const [opened, { toggle }] = useDisclosure();
  const [introModalOpened, setIntroModalOpened] = useState(true);
  const [endGame, setEndGame] = useState(false);

  const handleEndGame = () => {
    setEndGame(true);
  };

  return (
    <AppShell
      header={{ height: 80 }} // Adjust height to match Header component
      navbar={{
        width: 200,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        <Header />
      </AppShell.Header>
      <AppShell.Navbar>
        <ActorSidebar currentActor={currActor} setCurrentActor={setCurrActor} />
      </AppShell.Navbar>
      <AppShell.Main>
        {endGame ? (<MultipleChoiceGame />) : (
          <div style={{ display: 'grid', gridTemplateColumns: '3fr 1fr', gap: '10px', height: '100%' }}>
            <div style={{ overflow: 'auto' }}>
              <ActorChat actor={actors[currActor]} />
            </div>
            <div style={{ overflow: 'auto' }}>
              Notes <Textarea />
            </div>
          </div>
        )}
        <Button
          onClick={handleEndGame}
          size="xs"
          variant="outline"
          style={{ marginTop: '20px', alignSelf: 'center' }}
        >
          End Game: identify the murderer
        </Button>
      </AppShell.Main>

      <IntroModal
        opened={introModalOpened}
        onClose={() => setIntroModalOpened(false)}
      />
    </AppShell>
  );
}