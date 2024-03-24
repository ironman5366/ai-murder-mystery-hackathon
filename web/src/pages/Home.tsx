import React from "react";
import { Grid } from "@mantine/core";
import Header from "../components/Header";
import GlobalStory from "../components/GloablStory";
import Actors from "../components/Actors";
export default function Home() {
  return (
    <>
      <Grid>
        <Grid.Col span={12}>
          <Header />
        </Grid.Col>
        <Grid.Col span={3}>
          <GlobalStory />
        </Grid.Col>
        <Grid.Col span={9}>
          <Actors />
        </Grid.Col>
      </Grid>
    </>
  );
}
