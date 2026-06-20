import i18n from './i18n';
import en from './locales/en.json';
import zhCN from './locales/zh-CN.json';

test('i18n initializes with en and zh-CN resources', () => {
  expect(i18n.isInitialized).toBe(true);
  expect(i18n.language).toMatch(/^(en|en-US|zh|zh-CN|zh-)/);
});

test('en and zh-CN have the same keys', () => {
  const enKeys = Object.keys(en).sort();
  const zhKeys = Object.keys(zhCN).sort();
  expect(zhKeys).toEqual(enKeys);
});

test('all translation values are non-empty strings', () => {
  Object.entries(en).forEach(([key, value]) => {
    expect(typeof value).toBe('string');
    expect(value.length).toBeGreaterThan(0);
  });
  Object.entries(zhCN).forEach(([key, value]) => {
    expect(typeof value).toBe('string');
    expect(value.length).toBeGreaterThan(0);
  });
});

test('interpolation placeholders are consistent between languages', () => {
  const extractPlaceholders = (s: string) => [...s.matchAll(/\{\{(\w+)\}\}/g)].map(m => m[1]);
  Object.keys(en).forEach(key => {
    const enPH = extractPlaceholders(en[key as keyof typeof en]);
    const zhPH = extractPlaceholders(zhCN[key as keyof typeof zhCN]);
    expect(zhPH).toEqual(enPH);
  });
});
