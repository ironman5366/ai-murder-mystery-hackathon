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
      size="lg"
      title={
        <Text size="lg" fw={700}>Welcome to AI Alibis</Text>
      }
    >
      <Text>
        You are Detective Sheerluck, investigating the murder of Victim Vince.
      </Text>
      <br></br>
      <Text>
        Deduce the killer by chatting with suspects. The storyline, clues, and suspect alibis are all fixed, and every suspect is hiding someone about the case from the police. However, all these secrets might be uncovered by collecting clues and chatting with all the suspects...
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
        Click the Learn More button to learn more about our underlying critique & revision system used behind-the-scenes to keep the large language model controlled during inference.
      </Text>
      <br></br>
      <Text>
        If playing on a small screen, make sure to click the top-left burger menu to select new people to chat with.
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