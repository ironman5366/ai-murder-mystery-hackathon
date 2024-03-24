import React from "react";
import { Container, MantineProvider } from "@mantine/core";
import Home from "./pages/Home";
import { MysteryProvider } from "./providers/mysteryContext";

export default function App() {
  return (
    <MantineProvider>
      <MysteryProvider>
        <Container>
          <Home />
        </Container>
      </MysteryProvider>
    </MantineProvider>
  );
}
