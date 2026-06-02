// Copyright (C) CVAT.ai Corporation
//
// SPDX-License-Identifier: MIT

import React from 'react';
import { useTranslation } from 'react-i18next';
import Button from 'antd/lib/button';
import { GlobalOutlined } from '@ant-design/icons';
import CVATTooltip from 'components/common/cvat-tooltip';
import { setLocale, SupportedLocale } from 'i18n';

function LanguageSwitcher(): JSX.Element {
    const { t, i18n } = useTranslation();
    const isChinese = i18n.language.startsWith('zh');
    const nextLocale: SupportedLocale = isChinese ? 'en' : 'zh-CN';
    const label = isChinese ? t('common.languageEn') : t('common.languageZh');

    return (
        <CVATTooltip overlay={t('common.switchLanguage')}>
            <Button
                icon={<GlobalOutlined />}
                size='large'
                className='cvat-language-switcher-button cvat-header-button'
                type='link'
                onClick={() => setLocale(nextLocale)}
            >
                {label}
            </Button>
        </CVATTooltip>
    );
}

export default React.memo(LanguageSwitcher);
