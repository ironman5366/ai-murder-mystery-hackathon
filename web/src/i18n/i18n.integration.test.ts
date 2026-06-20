import i18n from 'i18next';
import en from './locales/en.json';
import zhCN from './locales/zh-CN.json';

test('zh-CN has different values for translated keys', () => {
  expect(zhCN.appTitle).toBe('AI Alibis');
  expect(zhCN.language).toBe('语言');
  expect(zhCN.letsPlay).toBe('知道了，开始游戏！');
});

test('fresh i18n instance translates correctly', async () => {
  const instance = i18n.createInstance();
  await instance.init({
    resources: {
      en: { translation: en },
      'zh-CN': { translation: zhCN },
    },
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  });

  await instance.changeLanguage('en');
  expect(instance.t('language')).toBe('Language');
  expect(instance.t('letsPlay')).toBe('Got it, let\'s play!');

  await instance.changeLanguage('zh-CN');
  expect(instance.language).toBe('zh-CN');
  expect(instance.t('language')).toBe('语言');
  expect(instance.t('letsPlay')).toBe('知道了，开始游戏！');
});
