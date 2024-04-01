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
          <Title>AI Alibis</Title>
          <Title order={3}>Multi-Agent LLM Murder Mystery</Title>
          <a
            href={"https://github.com/ironman5366/ai-murder-mystery-hackathon"}
            target={"_blank"}
            rel="noreferrer"
          >
            github.com/ironman5366/ai-murder-mystery-hackathon
          </a>
        </Stack>
      </Group>
    </Center>
  );
}
