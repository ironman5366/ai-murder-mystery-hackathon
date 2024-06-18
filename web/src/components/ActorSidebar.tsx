import React from "react";
import { Actor } from "../providers/mysteryContext";
import { Group, Text } from "@mantine/core";
import SidebarAvatar from "./SidebarAvatar";

interface Props {
  currentActor: number;
  setCurrentActor: (actor: number) => void;
  actors: Actor[];
  postGame: boolean;
}

export default function ActorSidebar({ currentActor, setCurrentActor, actors, postGame }: Props) {
  return (
    <div>
      {actors.map(actor => (
        <SidebarAvatar
          key={actor.id}
          actor={actor}
          currentActor={currentActor}
          setCurrentActor={setCurrentActor}
          postGame={postGame}
        />
      ))}
    </div>
  );
}