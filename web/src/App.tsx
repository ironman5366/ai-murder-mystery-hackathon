import React from "react";
import { Container, MantineProvider } from "@mantine/core";
import Home from "./pages/Home";
import { MysteryProvider } from "./providers/mysteryContext";
import { SessionProvider } from "./providers/sessionContext";

export default function App() {
  return (
    <MantineProvider>
      <SessionProvider>
        <MysteryProvider>
          <Home />
        </MysteryProvider>
      </SessionProvider>
    </MantineProvider>
  );
}
