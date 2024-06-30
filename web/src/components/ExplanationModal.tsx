// src/components/ExplanationModal.tsx

import React from 'react';
import { Modal, Button, Text, Image, Stack, Group, Anchor } from '@mantine/core';
import pinkelephants from '../assets/pinkelephants.png';
import pinkelephants2 from '../assets/pinkelephants2.png';
import synthlabsLogo from '../assets/synthlabs.png';
import medarcLogo from '../assets/medarc.png';

interface ExplanationModalProps {
  opened: boolean;
  onClose: () => void;
}

const ExplanationModal: React.FC<ExplanationModalProps> = ({ opened, onClose }) => {
  return (
    <Modal 
      opened={opened} 
      onClose={onClose} 
      size="lg"
      title={<Text size="lg" fw={700}>About the game</Text>}
    >
      <Text mt="md">
        Created by <Anchor href="https://paulscotti.github.io/" target="_blank">Paul Scotti</Anchor> & <Anchor href="https://www.willbeddow.com/" target="_blank">Will Beddow</Anchor> during a <Anchor href="https://www.synthlabs.ai/" target="_blank">synthlabs.ai</Anchor> hackathon. 
        <br></br>
        Submitted as part of <Anchor href="https://docs.anthropic.com/en/build-with-claude-contest/overview" target="_blank">Anthropic's June Developer Contest</Anchor>.
      </Text>
      <br></br>
      <Text size="lg" fw={700}>Pink elephants refinement system</Text>
      A challenging behavior to teach a language models is to avoid mentioning a topic when instructed to do so. A similar concept exists for humans: if instructed "don't think of a pink elephant" we can't help but to do so.
      <br></br>
      <Image src={pinkelephants} alt="Example of pink elephant phenomenon in LLMs" style={{marginLeft: '100 auto'}}/>
      <br></br>
      An interesting game one could play with this idea is to have a role-playing chat bot where the bot knows all the details about how they committed a crime, but they are instructed to lie as if they were never involved.
      <br></br>
      <br></br>
      <Image src={pinkelephants2} alt="Example of critique & refinement" style={{marginLeft: '100 auto'}}/>
      <br></br>
      Despite the chat bots being instructed not to confess to their secrets, we found that suspects often confessed to their deeds during dialogue. We implemented a critique & refinement system (inspired by <Anchor href="https://arxiv.org/abs/2402.07896" target="_blank">this paper</Anchor>) such that every message gets checked against a list of potential violations. If the bot detects a problem, the explanation for this detection along with the original message are sent to a refinement bot to fix the dialogue.
      <br></br><br></br>
      A paired dataset containing original messages, explanations of their violations, and the subsequent revised messages, could be used to fine-tune the system and improve the overall quality of this murder mystery game. This system is called <Anchor href="https://arxiv.org/abs/2402.07896" target="_blank">Direct Principle Feedback (DPO)</Anchor>.
      <Button onClick={onClose} fullWidth mt="md">
        Close
      </Button>
    </Modal>
  );
};

export default ExplanationModal;