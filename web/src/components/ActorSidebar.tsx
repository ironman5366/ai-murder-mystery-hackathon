import React from "react";
import { Actor, INITIAL_CHARACTERS_BY_ID } from "../providers/mysteryContext";
import { Stack } from "@mantine/core";
import SidebarAvatar from "./SidebarAvatar";

interface Props {
  currentActor: Actor;
  setCurrentActor: (actor: Actor) => void;
}

export default function ActorSidebar(props: Props) {
  return (
    <Stack>
      {Object.values(INITIAL_CHARACTERS_BY_ID).map((a, i) => (
        <SidebarAvatar actor={a} key={i} {...props} />
      ))}
    </Stack>
  );
}
