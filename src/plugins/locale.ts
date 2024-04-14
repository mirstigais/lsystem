import { createI18n } from 'vue-i18n';
import EN from '@locales/en.json';
import LV from '@locales/lv.json';

export const i18n = createI18n({
  locale: 'EN',
  legacy: false,
  messages: {
    EN: EN,
    LV: LV,
  }
});

export const langList = [
  {
    value: 'EN',
    label: 'EN',
  },
  {
    value: 'LV',
    label: 'LV',
  },
];

