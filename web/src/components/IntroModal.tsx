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
      title="**Welcome to AI Alibis**"
    >
      <Text>
        You are Detective Sheerluck, investigating the murder of Victim Vince.
      </Text>
      <br></br>
      <Text>
        Deduce the killer by chatting with suspects. They probably have some clues about their fellow suspects relevant to solving the case. Beware, every suspect is hiding something.
      </Text>
      <br></br>
      <Text>
        Your partner Officer Cleo can investigate locations at your request and present you with observational evidence. You can ask her to give you an overview of the case or to search certain locations for clues.
      </Text>
      <br></br>
      <Text>
        Take notes from your conversations and piece together who killed Victim Vince, why he was killed, and how. When you are ready, click the End Game button to make your deduction.
      </Text>
      <br></br>
      <Text>
        If on mobile, make sure to click the top-left burger menu to select new people to chat with.
      </Text>
      <br></br>
      <Text size="xs">
        To AI savvy players, the suspects' secrets are all in their context windows but we use special violation refinement methods to discourage suspects from spilling the beans! But you might be able to directly get the info you want with some sophisticated prompting...
      </Text>
      <br></br>
      <Button onClick={onClose}>
        Got it, let's play!
      </Button>
    </Modal>
  );
};

export default IntroModal;