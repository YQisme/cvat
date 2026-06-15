// Copyright (C) CVAT.ai Corporation
//
// SPDX-License-Identifier: MIT

import i18n from 'i18n';
import { JobStage, JobState } from 'cvat-core-wrapper';
import { ColorBy, StatesOrdering, Workspace } from 'reducers';

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

export function translateWorkspace(workspace: Workspace | string): string {
    return i18n.t(`annotation.workspace.${workspace}`, { defaultValue: workspace });
}

export function translateColorBy(colorBy: ColorBy | string): string {
    return i18n.t(`annotation.colorBy.${colorBy}`, { defaultValue: colorBy });
}

export function translateStatesOrdering(ordering: StatesOrdering | string): string {
    return i18n.t(`annotation.statesOrdering.${ordering}`, { defaultValue: ordering });
}

type BrandField = 'name' | 'subtitle' | 'description';

export function translateBrandField(field: BrandField, serverValue: string): string {
    const englishDefault = i18n.getFixedT('en')(`brand.${field}`);
    if (serverValue && serverValue !== englishDefault) {
        return serverValue;
    }
    return i18n.t(`brand.${field}`);
}
