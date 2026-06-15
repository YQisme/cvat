// Copyright (C) CVAT.ai Corporation
//
// SPDX-License-Identifier: MIT

import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { CombinedState } from 'reducers';
import { translateBrandField } from 'utils/i18n-labels';

function CVATLogo(): JSX.Element {
    const { t } = useTranslation();
    const logo = useSelector((state: CombinedState) => state.about.server.logoURL);

    return (
        <div className='cvat-logo-icon'>
            <img src={logo} alt={t('brand.logoAlt')} />
        </div>
    );
}

export default React.memo(CVATLogo);
