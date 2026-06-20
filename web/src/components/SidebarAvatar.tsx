import React from "react";
import { Actor } from "../providers/mysteryContext";
import { Group, Text } from "@mantine/core";
import ActorImage from "./ActorImage";
import { useTranslation } from "react-i18next";

interface Props {
  actor: Actor;
  currentActor: number;
  setCurrentActor: (actor: number) => void;
  postGame: boolean;
}

export default function SidebarAvatar({
  actor,
  currentActor,
  setCurrentActor,
  postGame,
}: Props) {
  const { t } = useTranslation();
  const displayName = t(`character${actor.name.replace(/\s+/g, '')}`, { defaultValue: actor.name });
  const active = actor.id === currentActor;

  return (
    <Group
      onClick={() => {
        if (!postGame) {
          setCurrentActor(actor.id);
        }
      }}
      style={{
        cursor: postGame ? "not-allowed" : "pointer",
        backgroundColor: active ? "lightblue" : "transparent",
      }}
    >
      <ActorImage actor={actor} />
      <Text>{displayName}</Text>
    </Group>
  );
}