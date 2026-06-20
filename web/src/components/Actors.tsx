import React from "react";
import { useMysteryContext } from "../providers/mysteryContext";
import { Grid, Stack, Title } from "@mantine/core";
import ActorChat from "./Actor";
import { useTranslation } from "react-i18next";

export default function Actors() {
  const { actors } = useMysteryContext();
  const { t } = useTranslation();

  return (
    <Stack>
      <Grid>
        <Title order={3}>{Object.values(actors).length} {t('actors')}</Title>
        <Grid>
          {Object.values(actors).map((a, i) => {
            return (
              <Grid.Col span={3} key={i}>
                <ActorChat actor={a} />
              </Grid.Col>
            );
          })}
        </Grid>
      </Grid>
    </Stack>
  );
}
