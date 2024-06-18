import React, { useState, useEffect } from 'react';
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
  const [postGame, setPostGame] = useState(false);
  const [filteredActors, setFilteredActors] = useState(Object.values(actors));

  useEffect(() => {
    if (!postGame) {
      setFilteredActors(Object.values(actors));
    }
  }, [actors, postGame]);

  const handleEndGame = () => {
    setEndGame(true);
  };

  const handleBackToGame = () => {
    const larry = Object.values(actors).filter(actor => actor.name === 'Amateur Larry');
    setFilteredActors(larry);
    setCurrActor(larry.length > 0 ? larry[0].id : 0); // Update current actor to Amateur Larry if present
    setEndGame(false);
    setPostGame(true);
  };

  const handleResumeGame = () => {
    setEndGame(false);
  };

  return (
    <AppShell
      header={{ height: "100px" }} // Adjust height to match Header component
      navbar={{
        width: 200,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Burger style={{
          position: 'fixed',
          top: '20px',
          left: '10px',
          zIndex: 1000,
        }} opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        <Header />
      </AppShell.Header>
      <AppShell.Navbar>
        <ActorSidebar currentActor={currActor} setCurrentActor={setCurrActor} actors={filteredActors} postGame={postGame} />
      </AppShell.Navbar>
      <AppShell.Main>
        {endGame ? (
          <MultipleChoiceGame onBackToGame={handleBackToGame} onResumeGame={handleResumeGame} />
        ) : (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: '3fr 1fr', gap: '10px', height: '100%' }}>
              <div style={{ overflowY: 'auto', height: '400px' }}>
                <ActorChat actor={actors[currActor]} />
              </div>
              <div style={{ overflow: 'auto'}}>
                Notes <Textarea autosize maxRows={12}/>
              </div>
            </div>
            <Button onClick={handleEndGame}>End Game</Button>
          </div>
        )}
      </AppShell.Main>
    </AppShell>
  );
}