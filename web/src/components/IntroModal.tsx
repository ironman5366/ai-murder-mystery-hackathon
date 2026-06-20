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
      size="lg"
      title={
        <Text size="lg" fw={700}>{t('welcomeTitle')}</Text>
      }
    >
      <Text>{t('introLine1')}</Text>
      <br></br>
      <Text>{t('introLine2')}</Text>
      <br></br>
      <Text>{t('introLine3')}</Text>
      <br></br>
      <Text>{t('introLine4')}</Text>
      <br></br>
      <Text>{t('introLine5')}</Text>
      <br></br>
      <Text>{t('introLine6')}</Text>
      <br></br>
      <Text size="xs">{t('introLine7')}</Text>
      <br></br>
      <Button onClick={onClose}>
        {t('letsPlay')}
      </Button>
    </Modal>
  );
};

export default IntroModal;