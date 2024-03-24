import React from "react";
import { Grid } from "@mantine/core";
import Header from "../components/Header";
import Actors from "../components/Actors";
export default function Home() {
  return (
    <>
      <Grid>
        <Grid.Col span={12}>
          <Header />
        </Grid.Col>
        <Actors />
      </Grid>
    </>
  );
}
