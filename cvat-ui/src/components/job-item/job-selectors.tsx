// Copyright (C) CVAT.ai Corporation
//
// SPDX-License-Identifier: MIT

import React from 'react';
import { useTranslation } from 'react-i18next';
import Select from 'antd/lib/select';
import { JobStage, JobState } from 'cvat-core-wrapper';
import { handleDropdownKeyDown } from 'utils/dropdown-utils';
import { translateJobStage, translateJobState } from 'utils/i18n-labels';

interface JobStateSelectorProps {
    value: JobState | null;
    onSelect: (newValue: JobState) => void;
}

export function JobStateSelector({ value, onSelect }: Readonly<JobStateSelectorProps>): JSX.Element {
    const { t } = useTranslation();

    return (
        <Select
            className='cvat-job-item-state'
            popupClassName='cvat-job-item-state-dropdown'
            value={value}
            onChange={onSelect}
            onKeyDown={handleDropdownKeyDown}
            placeholder={t('common.selectState')}
        >
            <Select.Option value={JobState.NEW}>{translateJobState(JobState.NEW)}</Select.Option>
            <Select.Option value={JobState.IN_PROGRESS}>{translateJobState(JobState.IN_PROGRESS)}</Select.Option>
            <Select.Option value={JobState.REJECTED}>{translateJobState(JobState.REJECTED)}</Select.Option>
            <Select.Option value={JobState.COMPLETED}>{translateJobState(JobState.COMPLETED)}</Select.Option>
        </Select>
    );
}

interface JobStageSelectorProps {
    value: JobStage | null;
    onSelect: (newValue: JobStage) => void;
}

export function JobStageSelector({ value, onSelect }: Readonly<JobStageSelectorProps>): JSX.Element {
    const { t } = useTranslation();

    return (
        <Select
            className='cvat-job-item-stage'
            popupClassName='cvat-job-item-stage-dropdown'
            value={value}
            onChange={onSelect}
            onKeyDown={handleDropdownKeyDown}
            placeholder={t('common.selectStage')}
        >
            <Select.Option value={JobStage.ANNOTATION}>
                {translateJobStage(JobStage.ANNOTATION)}
            </Select.Option>
            <Select.Option value={JobStage.VALIDATION}>
                {translateJobStage(JobStage.VALIDATION)}
            </Select.Option>
            <Select.Option value={JobStage.ACCEPTANCE}>
                {translateJobStage(JobStage.ACCEPTANCE)}
            </Select.Option>
        </Select>
    );
}
