import constate from "constate";
import {useState} from "react";

export interface LLMMessage {
    role: "user" | "assistant",
    content: string
}

export interface Actor {
    name: string;
    messages: LLMMessage[]
}


export const [mysteryContext, useMysteryContext] = constate(() => {
    const [globalStory, setGlobalStory] = useState("");
    const [actors, setActors] = useState<Actor[]>([]);

    return {
        globalStory,
        setGlobalStory,
        actors,
        setActors
    }
})
