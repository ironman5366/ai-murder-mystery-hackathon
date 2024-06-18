import React from 'react';
import { Modal, Button, Text } from '@mantine/core';

interface IntroModalProps {
  opened: boolean;
  onClose: () => void;
}

const IntroModal: React.FC<IntroModalProps> = ({ opened, onClose }) => {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Welcome to AI Alibis"
    >
      <Text>
        Welcome to the AI Alibis game! Here's how to play:
      </Text>
      <Text mt="sm">
        1. Interact with different characters to gather clues.
      </Text>
      <Text mt="sm">
        2. Ask questions to learn about their alibis.
      </Text>
      <Text mt="sm">
        3. Take notes and try to solve the mystery.
      </Text>
      <Text mt="sm">
        4. If on mobile, make sure to click the top-right burger menu to select new people to chat with.
      </Text>
      <Button onClick={onClose} mt="lg">
        Got it, let's play!
      </Button>
    </Modal>
  );
};

export default IntroModal;