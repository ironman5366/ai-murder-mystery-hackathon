import React from "react";
import { Actor } from "../providers/mysteryContext";
import { Image } from "@mantine/core";

interface Props {
  actor: Actor;
}

export default function ActorImage({ actor }: Props) {
  return (
    <Image
      src={require(`../assets/character_avatars/${actor.image}`)}
      style={{
        width: 50,
        height: 50,
        borderRadius: 50,
      }}
    />
  );
}
