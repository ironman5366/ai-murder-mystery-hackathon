import React from "react";
import { Actor } from "../providers/mysteryContext";
import { Group, Text } from "@mantine/core";
import ActorImage from "./ActorImage";

interface Props {
  actor: Actor;
  currentActor: Actor;
  setCurrentActor: (actor: Actor) => void;
}

export default function SidebarAvatar({
  actor,
  currentActor,
  setCurrentActor,
}: Props) {
  const active = actor.id === currentActor.id;

  return (
    <Group
      onClick={() => {
        setCurrentActor(actor);
      }}
      style={{
        cursor: "hover",
        backgroundColor: active ? "lightblue" : "transparent",
      }}
    >
      <ActorImage actor={actor} />
      <Text>{actor.name}</Text>
    </Group>
  );
}
