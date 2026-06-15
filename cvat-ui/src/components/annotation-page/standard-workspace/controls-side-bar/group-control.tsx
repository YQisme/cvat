// Copyright (C) 2020-2022 Intel Corporation
// Copyright (C) CVAT.ai Corporation
//
// SPDX-License-Identifier: MIT

import React from 'react';
import { useTranslation } from 'react-i18next';
import Icon from '@ant-design/icons';

import { GroupIcon } from 'icons';
import CVATTooltip from 'components/common/cvat-tooltip';
import { useSelector } from 'react-redux';
import { CombinedState } from 'reducers';
import { Canvas3d } from 'cvat-canvas3d-wrapper';
import { Canvas } from 'cvat-canvas-wrapper';

export interface Props {
    disabled?: boolean;
    dynamicIconProps: Record<string, any>;
    canvasInstance: Canvas | Canvas3d;
}

function GroupControl(props: Props): JSX.Element {
    const { t } = useTranslation();
    const {
        disabled,
        dynamicIconProps,
        canvasInstance,
    } = props;

    const { normalizedKeyMap } = useSelector((state: CombinedState) => state.shortcuts);

    const title = [];
    if (canvasInstance instanceof Canvas) {
        title.push(t('annotation.tooltips.groupShapes2d', { shortcut: normalizedKeyMap.SWITCH_GROUP_MODE_STANDARD_CONTROLS }));
        title.push(t('annotation.tooltips.groupReset', { shortcut: normalizedKeyMap.RESET_GROUP_STANDARD_CONTROLS }));
    } else if (canvasInstance instanceof Canvas3d) {
        title.push(t('annotation.tooltips.groupShapes3d', { shortcut: normalizedKeyMap.SWITCH_GROUP_MODE_STANDARD_3D_CONTROLS }));
        title.push(t('annotation.tooltips.groupReset', { shortcut: normalizedKeyMap.RESET_GROUP_STANDARD_3D_CONTROLS }));
    }

    return disabled ? (
        <Icon className='cvat-group-control cvat-disabled-canvas-control' component={GroupIcon} />
    ) : (
        <CVATTooltip title={title.join(' ')} placement='right'>
            <Icon {...dynamicIconProps} component={GroupIcon} />
        </CVATTooltip>
    );
}

Object.assign(GroupControl, { displayName: 'GroupControl' });
export default React.memo(GroupControl);
