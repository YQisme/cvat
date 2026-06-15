// Copyright (C) CVAT.ai Corporation
//
// SPDX-License-Identifier: MIT

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { setDayjsLocale } from 'utils/dayjs-wrapper';
import zhCN from './locales/zh-CN.json';
import en from './locales/en.json';

export const LOCALE_STORAGE_KEY = 'cvat-ui-locale';
export const DEFAULT_LOCALE = 'zh-CN';
export const SUPPORTED_LOCALES = ['zh-CN', 'en'] as const;
export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

function getStoredLocale(): SupportedLocale {
    const stored = localStorage.getItem(LOCALE_STORAGE_KEY);
    if (stored && SUPPORTED_LOCALES.includes(stored as SupportedLocale)) {
        return stored as SupportedLocale;
    }
    return DEFAULT_LOCALE;
}

i18n.use(initReactI18next).init({
    resources: {
        'zh-CN': { translation: zhCN },
        en: { translation: en },
    },
    lng: getStoredLocale(),
    fallbackLng: 'en',
    interpolation: {
        escapeValue: false,
    },
});

export function setLocale(locale: SupportedLocale): void {
    localStorage.setItem(LOCALE_STORAGE_KEY, locale);
    setDayjsLocale(locale);
    void i18n.changeLanguage(locale);
}

setDayjsLocale(getStoredLocale());

export default i18n;
