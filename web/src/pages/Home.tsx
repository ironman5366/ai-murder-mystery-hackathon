import React from "react";
import { AppShell, Grid } from "@mantine/core";
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
  const [opened] = useDisclosure();
  const { actors } = useMysteryContext();
  const [currActor, setCurrActor] = React.useState<number>(0);

  return (
    <AppShell
      header={{ height: 100 }}
      navbar={{
        width: 200,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Header />f
      </AppShell.Header>
      <AppShell.Navbar>
        <ActorSidebar currentActor={currActor} setCurrentActor={setCurrActor} />
      </AppShell.Navbar>
      <AppShell.Main>
        <ActorChat actor={actors[currActor]} />
      </AppShell.Main>
    </AppShell>
  );
}
