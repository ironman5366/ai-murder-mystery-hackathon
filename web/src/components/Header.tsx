import React from 'react';
import { Group, Image, Text, Anchor, Menu, Button } from '@mantine/core';
import logo from '../assets/logo.png';
import synthlabsLogo from '../assets/synthlabs.png';
import medarcLogo from '../assets/medarc.png';
import styles from './Header.module.css';
import { useTranslation } from 'react-i18next';

export default function Header() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className={styles.header}>
      <div className={styles['logo-container']}>
        <img src={logo} width="90px" className={styles.logo} alt="AI Alibis" />
        <div>
          <Text size="lg">{t('appTitle')}</Text>
          <Text size="12px">
            {t('appSubtitle')}
            <a href="https://github.com/ironman5366/ai-murder-mystery-hackathon">{t('github')}</a>
          </Text>
        </div>
      </div>
      <div className={styles.logos}>
        <Menu shadow="md" width={120}>
          <Menu.Target>
            <Button size="xs" variant="subtle">{t('language')}</Button>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item onClick={() => changeLanguage('en')}>{t('langEn')}</Menu.Item>
            <Menu.Item onClick={() => changeLanguage('zh-CN')}>{t('langZh')}</Menu.Item>
          </Menu.Dropdown>
        </Menu>
        <Anchor href="https://www.synthlabs.ai/" target="_blank">
          <Image src={synthlabsLogo} alt={t('synthLabsLogoAlt')} width={40} height={40} />
        </Anchor>
        <Anchor href="https://medarc.ai/" target="_blank">
          <Image src={medarcLogo} alt={t('medArcLogoAlt')} width={40} height={40} />
        </Anchor>
      </div>
    </div>
  );
}