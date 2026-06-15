// Copyright (C) CVAT.ai Corporation
//
// SPDX-License-Identifier: MIT

import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import Button from 'antd/lib/button';
import { useDispatch } from 'react-redux';
import { selectionActions } from 'actions/selection-actions';

interface ResourceSelectionInfoProps {
    selectedCount: number;
    onSelectAll?: () => void;
}

export function ResourceSelectionInfo(
    { selectedCount, onSelectAll }: Readonly<ResourceSelectionInfoProps>,
): JSX.Element | null {
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const handleDeselectAll = useCallback(() => {
        dispatch(selectionActions.clearSelectedResources());
    }, [dispatch]);

    if (selectedCount <= 1 && !onSelectAll) return null;

    let actionButton = null;
    if (onSelectAll && selectedCount === 0) {
        actionButton = (
            <Button
                className='cvat-resource-select-all-button'
                onClick={onSelectAll}
                size='small'
                type='link'
            >
                {t('common.selectAll')}
            </Button>
        );
    } else if (selectedCount > 0) {
        actionButton = (
            <Button
                className='cvat-resource-deselect-button'
                onClick={handleDeselectAll}
                onMouseDown={(e) => e.stopPropagation()}
                size='small'
                type='link'
            >
                {t('common.deselect')}
            </Button>
        );
    }

    return (
        <span className='cvat-resource-selection-info'>
            {actionButton}
            {selectedCount > 1 && (
                <span className='cvat-resource-selection-count'>
                    {t('common.selectedCount', { count: selectedCount })}
                </span>
            )}
        </span>
    );
}
