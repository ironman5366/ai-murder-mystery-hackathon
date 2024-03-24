import constate from "constate";
import { useState } from "react";
import Story from "../characters.json";

export interface LLMMessage {
  role: "user" | "assistant";
  content: string;
}

export interface Actor {
  id: number;
  name: string;
  bio: string;
  secret: string;
  image: string;
  messages: LLMMessage[];
}

const INITIAL_CHARACTERS = Story.characters.map(
  ({ name, bio, secret, image }, i) => ({
    id: i,
    name,
    bio,
    secret,
    image,
    messages: [],
  }),
);

export let INITIAL_CHARACTERS_BY_ID: { [id: number]: Actor } = {};

INITIAL_CHARACTERS.forEach((c) => {
  INITIAL_CHARACTERS_BY_ID[c.id] = c;
});

export const [MysteryProvider, useMysteryContext] = constate(() => {
  const [globalStory, setGlobalStory] = useState(Story.globalStory);
  const [actors, setActors] = useState<{ [id: number]: Actor }>(
    INITIAL_CHARACTERS_BY_ID,
  );

  return {
    globalStory,
    setGlobalStory,
    actors,
    setActors,
  };
});
