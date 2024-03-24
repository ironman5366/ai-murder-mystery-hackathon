import React, { useState } from "react";
import {
  Actor,
  LLMMessage,
  useMysteryContext,
} from "../providers/mysteryContext";
import { Button, Group, Stack, TextInput } from "@mantine/core";
import invokeAI from "../api/invoke";

interface Props {
  actor: Actor;
}

export default function ActorChat({ actor }: Props) {
  const [currMessage, setCurrMessage] = React.useState("");
  const { setActors, globalStory } = useMysteryContext();
  const [loading, setLoading] = useState(false);

  const setActor = (a: Partial<Actor>) => {
    setActors((all) => {
      const newActors = { ...all };
      newActors[actor.id] = {
        ...newActors[actor.id],
        ...a,
      };
      return newActors;
    });
  };

  const sendChat = (messages: LLMMessage[]) => {
    if (!loading) {
      setLoading(true);
      setActor({
        messages,
      });
      invokeAI({
        globalStory,
        messages,
      }).then((data) => {
        setActor({
          messages: [
            ...actor.messages,
            {
              role: "assistant",
              content: data.response,
            },
          ],
        });
        setLoading(false);
      });
    }
  };

  return (
    <Stack
      style={{
        border: "1px solid black",
        padding: 10,
        maxHeight: 300,
        overflow: "scroll",
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
          disabled={loading}
          onClick={() => {
            sendChat([
              ...actor.messages,
              {
                role: "user",
                content: currMessage,
              },
            ]);

            setCurrMessage("");
          }}
        >
          Send
        </Button>
      </Group>
    </Stack>
  );
}
