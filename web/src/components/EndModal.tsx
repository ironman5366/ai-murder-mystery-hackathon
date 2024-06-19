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
      title="Thank you for playing AI Alibis!"
    >
      <Text>
        Let's see if you solved the mystery... 🕵️
      </Text>
      <br></br>
      <Text>
        You can now chat with the murderer, who is now configured to answer all your questions honestly. He can tell you what really happened here in the Andae Mountains. Your multiple choice responses have automatically been rewritten as dialogue and submitted as your final deduction.
      </Text>
      <br></br>
      <Text size="xs">
        Did you enjoy the game? Let us know what you think on social media!
      </Text>
      <br></br>
      <Text size="xs">
        If you'd like to work together on a more advanced implementation of this idea, message Paul Scotti at scottibrain@gmail.com with "AI Alibis" in the email title.
      </Text>
      <Button onClick={onClose} mt="lg">
        Got it!
      </Button>
    </Modal>
  );
};

export default IntroModal;