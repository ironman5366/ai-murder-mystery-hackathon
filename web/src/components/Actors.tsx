import React from "react";
import { useMysteryContext } from "../providers/mysteryContext";
import { Button, Grid, Group, Stack, Title } from "@mantine/core";
import ActorChat from "./Actor";

export default function Actors() {
  const { actors, setActors } = useMysteryContext();

  return (
    <Stack>
      <Grid>
        <Title order={3}>{actors.length} Actors</Title>
        <Group>
          {actors.map((a, i) => {
            console.log("rendering actor ", a);
            return <ActorChat actor={a} key={i} />;
          })}
        </Group>

        <Button
          onClick={() => {
            const actorId = actors.length + 1;
            setActors([
              ...actors,
              { id: actorId, name: `Actor ${actorId}`, messages: [] },
            ]);
          }}
        >
          Add Actor
        </Button>
      </Grid>
    </Stack>
  );
}
