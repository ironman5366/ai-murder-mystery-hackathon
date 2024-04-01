import React, { useState } from "react";
import {
  Actor,
  LLMMessage,
  useMysteryContext,
} from "../providers/mysteryContext";
import { Button, Group, Loader, Stack, Text, TextInput } from "@mantine/core";
import invokeAI from "../api/invoke";
import ActorImage from "./ActorImage";
import { useSessionContext } from "../providers/sessionContext";
import CHARACTER_DATA from "../characters.json";

interface Props {
  actor: Actor;
}

export default function ActorChat({ actor }: Props) {
  const [currMessage, setCurrMessage] = React.useState("");
  const { setActors, globalStory } = useMysteryContext();
  const [loading, setLoading] = useState(false);
  const sessionId = useSessionContext();

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
        sessionId,
        characterFileVersion: CHARACTER_DATA.fileKey,
        actor: {
          ...actor,
          messages,
        },
      }).then((data) => {
        setActor({
          messages: [
            ...messages,
            {
              role: "assistant",
              content: data.final_response,
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
        overflow: "scroll",
      }}
    >
      <ActorImage actor={actor} />
      <Text
        style={{
          fontWeight: "bold",
        }}
      >
        {actor.name}
      </Text>
      <div>{actor.bio}</div>
      {actor.messages.map((m, i) => (
        <div
          key={i}
          style={{
            border: "1px dotted black",
          }}
        >
          {m.role === "user" ? "You" : actor.name}: {m.content}
        </div>
      ))}
      <Group>
        {loading ? (
          <Loader />
        ) : (
          <TextInput
            placeholder={`Talk to ${actor.name}`}
            onChange={(event) => {
              setCurrMessage(event.currentTarget.value);
            }}
            value={currMessage}
          />
        )}

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
