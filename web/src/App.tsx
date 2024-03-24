import React from 'react';
import './App.css';
import {Grid} from "@mantine/core";
import GlobalStory from "./components/GloablStory";

function App() {
  return (
      <>
          <Grid>
              <Grid.Col span={3}>
                  <GlobalStory />
              </Grid.Col>
              <Grid.Col span={9}>

              </Grid.Col>
          </Grid>
      </>
  );
}

export default App;
