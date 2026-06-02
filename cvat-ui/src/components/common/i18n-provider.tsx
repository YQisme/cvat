// Copyright (C) CVAT.ai Corporation
//
// SPDX-License-Identifier: MIT

import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ConfigProvider from 'antd/lib/config-provider';
import zhCN from 'antd/locale/zh_CN';
import enUS from 'antd/locale/en_US';

interface Props {
    children: React.ReactNode;
}

function I18nProvider({ children }: Props): JSX.Element {
    const { i18n } = useTranslation();
    const [locale, setLocale] = useState(i18n.language);

    useEffect(() => {
        const onLanguageChanged = (lng: string): void => {
            setLocale(lng);
        };
        i18n.on('languageChanged', onLanguageChanged);
        return () => {
            i18n.off('languageChanged', onLanguageChanged);
        };
    }, [i18n]);

    const antdLocale = locale.startsWith('zh') ? zhCN : enUS;

    return (
        <ConfigProvider locale={antdLocale}>
            {children}
        </ConfigProvider>
    );
}

export default I18nProvider;
