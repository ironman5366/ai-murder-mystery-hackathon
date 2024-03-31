import React from "react";
import {useMysteryContext} from "../providers/mysteryContext";
import {Stack, Textarea, Title} from "@mantine/core";


export default function GlobalStory() {
    const { globalStory, setGlobalStory } = useMysteryContext()

    return <Stack>
        <Title order={2}>
            Global Story
        </Title>
        <Textarea value={globalStory} onChange={(event) => setGlobalStory(event.currentTarget.value)} />
    </Stack>
}
