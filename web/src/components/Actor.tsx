import React from "react";
import { Actor } from "../providers/mysteryContext";
import { Stack, TextInput, Title } from "@mantine/core";

interface Props {
  actor: Actor;
}

export default function ActorChat({ actor }: Props) {
  const [currMessage, setCurrMessage] = React.useState("");

  return (
    <Stack
      style={{
        border: "1px solid black",
        padding: 10,
      }}
    >
      <Title order={3}>Actor {actor.name}</Title>
      {actor.messages.map((m) => (
        <div
          style={{
            border: "1px dotted black",
          }}
        >
          {m.role}: {m.content}
        </div>
      ))}
      <TextInput placeholder={`Talk to ${actor.name}`} />
    </Stack>
  );
}
