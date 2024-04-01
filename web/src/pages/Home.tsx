import React from "react";
import { AppShell, Burger, Grid, Textarea, Title } from "@mantine/core";
import Header from "../components/Header";
import Actors from "../components/Actors";
import { useDisclosure } from "@mantine/hooks";
import {
  Actor,
  INITIAL_CHARACTERS_BY_ID,
  useMysteryContext,
} from "../providers/mysteryContext";
import ActorSidebar from "../components/ActorSidebar";
import ActorChat from "../components/Actor";
export default function Home() {
  const { actors } = useMysteryContext();
  const [currActor, setCurrActor] = React.useState<number>(0);
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 200 }}
      navbar={{
        width: 200,
        breakpoint: "sm",
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
        <Grid>
          <Grid.Col span={9}>
            <ActorChat actor={actors[currActor]} />
          </Grid.Col>
          <Grid.Col span={3}>
            <Title order={3}>Your notes</Title>
            <Textarea></Textarea>
          </Grid.Col>
        </Grid>
      </AppShell.Main>
    </AppShell>
  );
}
