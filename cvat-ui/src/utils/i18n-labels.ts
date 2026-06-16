// Copyright (C) CVAT.ai Corporation
//
// SPDX-License-Identifier: MIT

import i18n from 'i18n';
import { JobStage, JobState, ObjectType, ShapeType } from 'cvat-core-wrapper';
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

const SHAPE_TYPE_KEYS: Record<string, string> = {
    [ShapeType.RECTANGLE]: 'annotation.filters.shapeRectangle',
    [ShapeType.POLYGON]: 'annotation.filters.shapePolygon',
    [ShapeType.POLYLINE]: 'annotation.filters.shapePolyline',
    [ShapeType.POINTS]: 'annotation.filters.shapePoints',
    [ShapeType.ELLIPSE]: 'annotation.filters.shapeEllipse',
    [ShapeType.CUBOID]: 'annotation.filters.shapeCuboid',
    [ShapeType.SKELETON]: 'annotation.filters.shapeSkeleton',
    [ShapeType.MASK]: 'annotation.filters.shapeMask',
};

const OBJECT_TYPE_KEYS: Record<string, string> = {
    [ObjectType.SHAPE]: 'annotation.filters.typeShape',
    [ObjectType.TRACK]: 'annotation.filters.typeTrack',
    [ObjectType.TAG]: 'annotation.filters.typeTag',
};

export function translateShapeType(shapeType: ShapeType | string): string {
    const key = SHAPE_TYPE_KEYS[shapeType];
    return key ? i18n.t(key) : String(shapeType);
}

export function translateObjectType(objectType: ObjectType | string): string {
    const key = OBJECT_TYPE_KEYS[objectType];
    return key ? i18n.t(key) : String(objectType);
}

export function translateShortcutName(shortcutKey: string, defaultName: string): string {
    return i18n.t(`shortcuts.names.${shortcutKey}`, { defaultValue: defaultName });
}

export function translateShortcutDescription(shortcutKey: string, defaultDescription: string): string {
    return i18n.t(`shortcuts.descriptions.${shortcutKey}`, { defaultValue: defaultDescription });
}

export function translateShortcutScope(scope: string): string {
    return i18n.t(`settings.shortcutScopes.${scope}`, { defaultValue: scope.split('_').join(' ') });
}

const SERVER_STATUS_KEYS: Record<string, string> = {
    'Data are being copied from source..': 'serverStatus.copyingFromSource',
    'Task is being saved in database': 'serverStatus.savingTaskToDatabase',
    'Validating the input manifest file': 'serverStatus.validatingManifest',
    'Preparing a manifest file': 'serverStatus.preparingManifest',
    'A manifest has been created': 'serverStatus.manifestCreated',
    'Downloading input media': 'serverStatus.downloadingInputMedia',
    'Media files are being extracted...': 'serverStatus.mediaExtracting',
    'CVAT is preparing data chunks': 'serverStatus.preparingDataChunks',
};

export function translateRequestMessage(message: string): string {
    if (!message) return message;

    const directKey = SERVER_STATUS_KEYS[message];
    if (directKey) {
        return i18n.t(directKey);
    }

    const downloadMatch = message.match(/^(.+) is being downloaded\.\.$/);
    if (downloadMatch) {
        return i18n.t('serverStatus.downloadingUrl', { url: downloadMatch[1] });
    }

    const chunksMatch = message.match(/^CVAT is preparing data chunks(.*)$/);
    if (chunksMatch) {
        const animation = chunksMatch[1].trim();
        return animation ?
            i18n.t('serverStatus.preparingDataChunksWithAnimation', { animation }) :
            i18n.t('serverStatus.preparingDataChunks');
    }

    const manifestFailMatch = message.match(
        /^Failed to create manifest for the uploaded video(.*)\. A manifest will not be used in this task$/,
    );
    if (manifestFailMatch) {
        const details = manifestFailMatch[1];
        return details ?
            i18n.t('serverStatus.manifestCreateFailedWithDetails', { details }) :
            i18n.t('serverStatus.manifestCreateFailed');
    }

    return message;
}

export function translateRequestOperationType(type: string): string {
    const [action, target] = type.split(':');
    if (!action || !target) return type;

    const translatedAction = i18n.t(`requests.operations.${action}`, { defaultValue: action });
    const translatedTarget = i18n.t(`requests.operations.${target}`, { defaultValue: target });
    return `${translatedAction} ${translatedTarget}`;
}

const NOTIFICATION_MESSAGE_KEYS: Record<string, string> = {
    'Export is finished': 'notifications.exportFinished',
    'Backup export is finished': 'notifications.backupExportFinished',
    'Annotations import is finished': 'notifications.annotationsImportFinished',
    'Import backup is finished': 'notifications.importBackupFinished',
};

export function translateNotificationMessage(message: string): string {
    const key = NOTIFICATION_MESSAGE_KEYS[message];
    return key ? i18n.t(key) : message;
}

export function translateNotificationDescription(description: string): string {
    if (!description) return description;

    const downloadHere = i18n.t('notifications.downloadHere');
    if (description.includes('You can [download it here](/requests).')) {
        return description.replace(
            'You can [download it here](/requests).',
            downloadHere,
        );
    }

    const checkProgressHere = i18n.t('notifications.checkProgressHere');
    if (description.includes('You can check progress and download the file [here](/requests).')) {
        return description.replace(
            'You can check progress and download the file [here](/requests).',
            checkProgressHere,
        );
    }

    const checkProgress = i18n.t('notifications.checkProgress');
    if (description.includes('You can check progress [here](/requests).')) {
        return description.replace(
            'You can check progress [here](/requests).',
            checkProgress,
        );
    }

    const exportFinishedMatch = description.match(
        /^Export (Dataset|Annotations) for (project|task|job) (\d+) is finished\. /,
    );
    if (exportFinishedMatch) {
        const [, resource, instanceType, id] = exportFinishedMatch;
        const resourceKey = resource.toLowerCase() === 'dataset' ? 'dataset' : 'annotations';
        return i18n.t(`notifications.exportDescription.${resourceKey}`, {
            instanceType: i18n.t(`requests.instanceTypes.${instanceType}`),
            id,
        }) + (description.includes('[here]') ? ` ${downloadHere}` : '');
    }

    const exportCloudMatch = description.match(
        /^Export (Dataset|Annotations) for (project|task|job) (\d+) has been uploaded to cloud storage\.$/,
    );
    if (exportCloudMatch) {
        const [, resource, instanceType, id] = exportCloudMatch;
        const resourceKey = resource.toLowerCase() === 'dataset' ? 'dataset' : 'annotations';
        return i18n.t(`notifications.exportCloudDescription.${resourceKey}`, {
            instanceType: i18n.t(`requests.instanceTypes.${instanceType}`),
            id,
        });
    }

    const backupFinishedMatch = description.match(
        /^Backup for the (project|task|job) (\d+) is finished\. /,
    );
    if (backupFinishedMatch) {
        const [, instanceType, id] = backupFinishedMatch;
        return i18n.t('notifications.backupExportDescription', {
            instanceType: i18n.t(`requests.instanceTypes.${instanceType}`),
            id,
        }) + (description.includes('[here]') ? ` ${downloadHere}` : '');
    }

    const backupCloudMatch = description.match(
        /^Backup for the (project|task|job) (\d+) has been uploaded to cloud storage\.$/,
    );
    if (backupCloudMatch) {
        const [, instanceType, id] = backupCloudMatch;
        return i18n.t('notifications.backupCloudDescription', {
            instanceType: i18n.t(`requests.instanceTypes.${instanceType}`),
            id,
        });
    }

    return description;
}

type BrandField = 'name' | 'subtitle' | 'description';

export function translateBrandField(field: BrandField, serverValue: string): string {
    const englishDefault = i18n.getFixedT('en')(`brand.${field}`);
    if (serverValue && serverValue !== englishDefault) {
        return serverValue;
    }
    return i18n.t(`brand.${field}`);
}
