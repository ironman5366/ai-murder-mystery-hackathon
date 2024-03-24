import React from "react";
import { useMysteryContext } from "../providers/mysteryContext";
import { Grid, Stack, Title } from "@mantine/core";
import ActorChat from "./Actor";

export default function Actors() {
  const { actors } = useMysteryContext();

  return (
    <Stack>
      <Grid>
        <Title order={3}>{Object.values(actors).length} Actors</Title>
        <Grid>
          {Object.values(actors).map((a, i) => {
            return (
              <Grid.Col span={3}>
                <ActorChat actor={a} key={i} />
              </Grid.Col>
            );
          })}
        </Grid>
      </Grid>
    </Stack>
  );
}
