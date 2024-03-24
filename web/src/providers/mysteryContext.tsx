import constate from "constate";
import {useState} from "react";

interface Actor {
    name: string;
    context: string
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
