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
import { useTranslation } from "react-i18next";

interface Props {
  actor: Actor;
}

const sendChat = async (
  messages: LLMMessage[],
  setActors: (update: (all: Record<number, Actor>) => Record<number, Actor>) => void,
  globalStory: string,
  sessionId: string,
  actor: Actor,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  language: string
) => {
  setLoading(true);
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

  setActor({ messages });

  const data = await invokeAI({
    globalStory,
    sessionId,
    characterFileVersion: CHARACTER_DATA.fileKey,
    actor: {
      ...actor,
      messages,
    },
    language,
  });

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
};

const ActorChat = ({ actor }: Props) => {
  const [currMessage, setCurrMessage] = React.useState("");
  const { setActors, globalStory } = useMysteryContext();
  const [loading, setLoading] = useState(false);
  const sessionId = useSessionContext();
  const { t, i18n } = useTranslation();
  const displayName = t(`character${actor.name.replace(/\s+/g, '')}`, { defaultValue: actor.name });
  const translatedBio = t(`bio${actor.name.replace(/\s+/g, '')}`, { defaultValue: actor.bio });

  const handleSendMessage = () => {
    const newMessage: LLMMessage = {
      role: "user",
      content: t('detectivePrefix') + currMessage,
    };

    sendChat([...actor.messages, newMessage], setActors, globalStory, sessionId, actor, setLoading, i18n.language);
    setCurrMessage("");
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
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
        {displayName}
      </Text>
      <div>{translatedBio}</div>
      {actor.messages.map((m, i) => (
        <div
          key={i}
          style={{
            border: "1px dotted black",
          }}
        >
          {m.role === "user" ? "" : displayName + t('colon')} {m.content}
        </div>
      ))}
      <Group>
        {loading ? (
          <Loader />
        ) : (
          <TextInput
            placeholder={t('talkTo', { name: displayName })}
            onChange={(event) => {
              setCurrMessage(event.currentTarget.value);
            }}
            value={currMessage}
            style={{ flexGrow: 1 }}  // Make the text input take available space
            onKeyPress={handleKeyPress}  // Add key press handler
          />
        )}

        <Button disabled={loading} onClick={handleSendMessage}>
          {t('send')}
        </Button>
      </Group>
    </Stack>
  );
};

export { sendChat };
export default ActorChat;