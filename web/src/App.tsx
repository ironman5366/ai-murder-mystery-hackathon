import React from "react";
import {Container, MantineProvider} from "@mantine/core";
import Home from "./pages/Home";

export default function App() {
    return <MantineProvider>
        <Container>
            <Home />
        </Container>
    </MantineProvider>

}
