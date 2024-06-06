// src/components/TextArea.tsx

import React from 'react';
import { Textarea, Title } from '@mantine/core';

const TextArea: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Title order={5}>Your notes</Title>
      <div style={{ marginTop: '10px', flex: 1, display: 'flex', flexDirection: 'column', height: '60vh' }}>
        <Textarea
          autosize
          minRows={10}
          maxRows={10}
          style={{ width: '100%', height: '100%' }}
        />
      </div>
    </div>
  );
};

export default TextArea;