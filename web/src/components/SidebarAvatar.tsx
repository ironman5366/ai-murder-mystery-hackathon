import React from "react";
import { Actor } from "../providers/mysteryContext";
import { Group, Text } from "@mantine/core";
import ActorImage from "./ActorImage";

interface Props {
  actor: Actor;
  currentActor: number;
  setCurrentActor: (actor: number) => void;
}

export default function SidebarAvatar({
  actor,
  currentActor,
  setCurrentActor,
}: Props) {
  const active = actor.id === currentActor;

  return (
    <Group
      onClick={() => {
        setCurrentActor(actor.id);
      }}
      style={{
        cursor: "pointer",
        backgroundColor: active ? "lightblue" : "transparent",
      }}
    >
      <ActorImage actor={actor} />
      <Text>{actor.name}</Text>
    </Group>
  );
}
