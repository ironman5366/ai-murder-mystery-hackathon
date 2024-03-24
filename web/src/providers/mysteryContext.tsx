import constate from "constate";
import { useState } from "react";

export interface LLMMessage {
  role: "user" | "assistant";
  content: string;
}

export interface Actor {
  id: number;
  name: string;
  messages: LLMMessage[];
}

export const [MysteryProvider, useMysteryContext] = constate(() => {
  const [globalStory, setGlobalStory] = useState("");
  const [actors, setActors] = useState<Actor[]>([]);

  return {
    globalStory,
    setGlobalStory,
    actors,
    setActors,
  };
});
