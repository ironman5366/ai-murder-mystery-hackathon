import React from 'react';
import { Group, Image, Text, Anchor } from '@mantine/core';
import logo from '../assets/logo.png';

export default function Header(){
  return (
    <Group
      align="center"
      px="md"
      py="sm"
      style={{
        backgroundColor: '#f5f5f5',
        borderBottom: '1px solid #e0e0e0',
        height: '80px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center'}}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src={logo} width="90px" style={{ paddingLeft: '30px', paddingRight: '10px' }} />
          <div>
            <Text size="lg">AI Alibis</Text>
            <Text size="12px">Multi-Agent LLM Murder Mystery</Text>
          </div>
        </div>
        <Anchor 
          href="https://github.com/ironman5366/ai-murder-mystery-hackathon" 
          target="_blank" 
          style={{ fontSize: 'smaller', marginLeft: '50px' }}
        >
          github.com/ironman5366/ai-murder-mystery-hackathon
        </Anchor>
      </div>
    </Group>
  );
};