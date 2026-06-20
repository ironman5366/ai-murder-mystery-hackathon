import React from 'react';
import { Modal, Button, Text } from '@mantine/core';
import { useTranslation } from 'react-i18next';

interface IntroModalProps {
  opened: boolean;
  onClose: () => void;
}

const IntroModal: React.FC<IntroModalProps> = ({ opened, onClose }) => {
  const { t } = useTranslation();
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={t('endTitle')}
    >
      <Text>{t('endLine1')}</Text>
      <br></br>
      <Text>{t('endLine2')}</Text>
      <br></br>
      <Text size="xs">
        {t('endLine3Prefix')}
        <a href="https://arxiv.org/abs/2402.07896">{t('pinkElephant')}</a>
        {t('endLine3Mid')}
        <a href="https://github.com/ironman5366/ai-murder-mystery-hackathon">{t('github')}</a>
        {t('endLine3Suffix')}
      </Text>
      <br></br>
      <Text size="xs">{t('endLine4')}</Text>
      <Button onClick={onClose} mt="lg">
        {t('gotIt')}
      </Button>
    </Modal>
  );
};

export default IntroModal;
