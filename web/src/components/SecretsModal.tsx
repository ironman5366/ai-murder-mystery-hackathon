import React from 'react';
import { Modal, Button, Text, Image, Stack, Group, Anchor } from '@mantine/core';
import secrets from '../assets/secrets.png';
import secrets_blurred from '../assets/secrets_blurred.png';

interface SecretsModalProps {
  opened: boolean;
  onClose: () => void;
  postGame: boolean;  // Add postGame prop
}

const SecretsModal: React.FC<SecretsModalProps> = ({ opened, onClose, postGame }) => {
  return (
    <Modal 
      opened={opened} 
      onClose={onClose} 
      size="xl"
      title={<Text size="lg" fw={700}>Spoilers</Text>}
    >
      <Image 
        src={postGame ? secrets_blurred : secrets}  // Conditionally render image
        style={{marginLeft: '100 auto'}}
      />
      <Button onClick={onClose} fullWidth mt="md">
        Close
      </Button>
    </Modal>
  );
};

export default SecretsModal;