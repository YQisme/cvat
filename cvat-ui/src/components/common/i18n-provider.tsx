// Copyright (C) CVAT.ai Corporation
//
// SPDX-License-Identifier: MIT

import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ConfigProvider from 'antd/lib/config-provider';
import zhCN from 'antd/locale/zh_CN';
import enUS from 'antd/locale/en_US';
import { setDayjsLocale } from 'utils/dayjs-wrapper';

interface Props {
    children: React.ReactNode;
}

function updateDocumentLanguage(locale: string, t: (key: string) => string): void {
    document.title = t('brand.name');
    document.documentElement.lang = locale.startsWith('zh') ? 'zh-CN' : 'en';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
        metaDescription.setAttribute('content', t('brand.pageDescription'));
    }
}

function I18nProvider({ children }: Props): JSX.Element {
    const { i18n, t } = useTranslation();
    const [locale, setLocale] = useState(i18n.language);

    useEffect(() => {
        setDayjsLocale(i18n.language);
        updateDocumentLanguage(i18n.language, t);
        const onLanguageChanged = (lng: string): void => {
            setDayjsLocale(lng);
            setLocale(lng);
            updateDocumentLanguage(lng, i18n.getFixedT(lng));
        };
        i18n.on('languageChanged', onLanguageChanged);
        return () => {
            i18n.off('languageChanged', onLanguageChanged);
        };
    }, [i18n, t]);

    const antdLocale = locale.startsWith('zh') ? zhCN : enUS;

    return (
        <ConfigProvider locale={antdLocale}>
            {children}
        </ConfigProvider>
    );
}

export default I18nProvider;
