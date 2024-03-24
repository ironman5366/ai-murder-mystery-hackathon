import React from "react";
import { Actor, useMysteryContext } from "../providers/mysteryContext";
import { Button, Group, Stack, TextInput } from "@mantine/core";

interface Props {
  actor: Actor;
}

export default function ActorChat({ actor }: Props) {
  const [currMessage, setCurrMessage] = React.useState("");
  const { setActors } = useMysteryContext();

  const setActor = (a: Partial<Actor>) => {
    setActors((all) => {
      const newActors = [...all];
      const index = newActors.findIndex((actor) => actor.id === a.id);
      newActors[index] = { ...newActors[index], ...a };
      return newActors;
    });
  };

  return (
    <Stack
      style={{
        border: "1px solid black",
        padding: 10,
      }}
    >
      <TextInput
        onChange={(event) => {
          setActor({
            name: event.currentTarget.value,
          });
        }}
        value={actor.name}
      />
      {actor.messages.map((m) => (
        <div
          style={{
            border: "1px dotted black",
          }}
        >
          {m.role}: {m.content}
        </div>
      ))}
      <Group>
        <TextInput
          placeholder={`Talk to ${actor.name}`}
          onChange={(event) => {
            setCurrMessage(event.currentTarget.value);
          }}
          value={currMessage}
        />
        <Button
          onClick={() => {
            // TODO: actually do the inference lol
            setActor({
              messages: [
                ...actor.messages,
                {
                  role: "user",
                  content: currMessage,
                },
              ],
            });
            setCurrMessage("");
          }}
        >
          Send
        </Button>
      </Group>
    </Stack>
  );
}
