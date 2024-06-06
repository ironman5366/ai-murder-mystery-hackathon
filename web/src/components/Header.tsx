import React from 'react';
import { Group, Image, Text, Title, Anchor } from '@mantine/core';
import logo from '../assets/logo.png';

const Header: React.FC = () => {
  return (
    <Group
      align="center"
      style={{
        padding: '10px 20px',
        backgroundColor: '#f5f5f5',
        borderBottom: '1px solid #e0e0e0',
        justifyContent: 'space-between',
      }}
    >
      <Group align="center" style={{ gap: '10px' }}>
        <Image src={logo} alt="AI Alibis Logo" width={60} height={60} />
        <div>
          <Title order={2} style={{ marginBottom: 0 }}>AI Alibis</Title>
          <Text color="dimmed" size="sm">Multi-Agent LLM Murder Mystery</Text>
        </div>
      </Group>
      <Anchor href="https://github.com/ironman5366/ai-murder-mystery-hackathon" target="_blank">
        github.com/ironman5366/ai-murder-mystery-hackathon
      </Anchor>
    </Group>
  );
};

export default Header;