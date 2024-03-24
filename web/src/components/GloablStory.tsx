import React from "react";
import {useMysteryContext} from "../providers/mysteryContext";
import {Textarea} from "@mantine/core";


export default function GlobalStory() {
    const { globalStory, setGlobalStory } = useMysteryContext()

    return <Textarea value={globalStory} onChange={(event) => setGlobalStory(event.currentTarget.value)} />
}
