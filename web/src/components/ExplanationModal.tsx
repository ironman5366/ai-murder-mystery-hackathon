import React from 'react';
import { Modal, Button, Text, Image, Anchor } from '@mantine/core';
import pinkelephants from '../assets/pinkelephants.png';
import pinkelephants2 from '../assets/pinkelephants2.png';
import { useTranslation } from 'react-i18next';

interface ExplanationModalProps {
  opened: boolean;
  onClose: () => void;
}

const ExplanationModal: React.FC<ExplanationModalProps> = ({ opened, onClose }) => {
  const { t } = useTranslation();
  return (
    <Modal 
      opened={opened} 
      onClose={onClose} 
      size="lg"
      title={<Text size="lg" fw={700}>{t('aboutGame')}</Text>}
    >
      <Text mt="md">
        {t('aboutGameLine1Prefix')}
        <Anchor href="https://paulscotti.github.io/" target="_blank">Paul Scotti</Anchor>
        &nbsp;&amp;&nbsp;
        <Anchor href="https://www.willbeddow.com/" target="_blank">Will Beddow</Anchor>
        {t('aboutGameLine1Suffix')}
        <br></br>
        {t('aboutGameLine2Prefix')}
        <Anchor href="https://docs.anthropic.com/en/build-with-claude-contest/overview" target="_blank">{t('aboutGameLine2Link')}</Anchor>
        {t('aboutGameLine2Suffix')}
        <br></br>
        {t('aboutGameLine3Prefix')}
        <Anchor href="https://en.wikipedia.org/wiki/Crime_Scene_(South_Korean_TV_series)" target="_blank">{t('aboutGameLine3Link')}</Anchor>
        {t('aboutGameLine3Suffix')}
      </Text>
      <br></br>
      <Text size="lg" fw={700}>{t('pinkElephantsTitle')}</Text>
      {t('pinkElephantsLine1')}
      <br></br>
      <Image src={pinkelephants} alt={t('pinkElephantsTitle')} style={{marginLeft: '100 auto'}}/>
      <br></br>
      {t('pinkElephantsLine2')}
      <br></br>
      <br></br>
      <Image src={pinkelephants2} alt={t('pinkElephantsTitle')} style={{marginLeft: '100 auto'}}/>
      <br></br>
      {t('pinkElephantsLine3Prefix')}
      <Anchor href="https://arxiv.org/abs/2402.07896" target="_blank">{t('pinkElephantsLine3Link')}</Anchor>
      {t('pinkElephantsLine3Suffix')}
      <br></br><br></br>
      {t('pinkElephantsLine4Prefix')}
      <Anchor href="https://arxiv.org/abs/2402.07896" target="_blank">{t('pinkElephantsLine4Link')}</Anchor>
      {t('pinkElephantsLine4Suffix')}
      <Button onClick={onClose} fullWidth mt="md">
        {t('close')}
      </Button>
    </Modal>
  );
};

export default ExplanationModal;
