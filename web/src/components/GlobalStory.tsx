import React from "react";
import {useMysteryContext} from "../providers/mysteryContext";
import {Stack, Textarea, Title} from "@mantine/core";
import { useTranslation } from "react-i18next";


export default function GlobalStory() {
    const { globalStory, setGlobalStory } = useMysteryContext()
    const { t } = useTranslation()

    return <Stack>
        <Title order={2}>
            {t('globalStory')}
        </Title>
        <Textarea value={globalStory} onChange={(event) => setGlobalStory(event.currentTarget.value)} />
    </Stack>
}
