import React from "react";
import { useMysteryContext } from "../providers/mysteryContext";
import { Stack } from "@mantine/core";

export default function Actors() {
  const { actors, setActors } = useMysteryContext();

  return <Stack>TODO: actors here</Stack>;
}
