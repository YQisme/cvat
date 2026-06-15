// Copyright (C) CVAT.ai Corporation
//
// SPDX-License-Identifier: MIT

import i18n from 'i18n';
import { JobStage, JobState } from 'cvat-core-wrapper';

export function translateJobStage(stage: JobStage | string | null): string {
    if (!stage) return '';
    return i18n.t(`jobStage.${stage}`, { defaultValue: stage });
}

export function translateJobState(state: JobState | string | null): string {
    if (!state) return '';
    return i18n.t(`jobState.${state}`, { defaultValue: state });
}

export function translatePredefinedFilter(key: string): string {
    return i18n.t(`resource.predefinedFilters.${key}`, { defaultValue: key });
}
