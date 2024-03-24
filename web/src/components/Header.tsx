import React from "react";
import { Center, Group, Image, Stack, Title } from "@mantine/core";
import Logo from "../assets/logo.png";

export default function Header() {
  return (
    <Center
      style={{
        marginTop: 10,
      }}
    >
      <Group justify={"space-between"}>
        <Image
          src={Logo}
          style={{
            width: 75,
            height: 75,
          }}
        />
        <Stack>
          <Title>Clue-Bot</Title>
          <Title order={3}>Intrigue is all you need</Title>
        </Stack>
      </Group>
    </Center>
  );
}
