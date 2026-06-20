import React from 'react';
import { Modal, Button, Text, Image, Stack, Group, Anchor } from '@mantine/core';
import secrets from '../assets/secrets.png';
import secrets_blurred from '../assets/secrets_blurred.png';
import { useTranslation } from 'react-i18next';

interface SecretsModalProps {
  opened: boolean;
  onClose: () => void;
  postGame: boolean;
}

const SecretsModal: React.FC<SecretsModalProps> = ({ opened, onClose, postGame }) => {
  const { t } = useTranslation();
  return (
    <Modal 
      opened={opened} 
      onClose={onClose} 
      size="xl"
      title={<Text size="lg" fw={700}>{t('spoilers')}</Text>}
    >
      <Image 
        src={postGame ? secrets_blurred : secrets}
        style={{marginLeft: '100 auto'}}
      />
      <Button onClick={onClose} fullWidth mt="md">
        {t('close')}
      </Button>
    </Modal>
  );
};

export default SecretsModal;