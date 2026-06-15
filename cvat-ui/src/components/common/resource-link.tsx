// Copyright (C) CVAT.ai Corporation
//
// SPDX-License-Identifier: MIT

import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Project, Task, Job } from 'cvat-core-wrapper';

function ResourceLink({ resource }: { resource: Project | Task | Job }): JSX.Element | null {
    const { t } = useTranslation();

    if (resource instanceof Project) {
        return (
            <Link to={`/projects/${resource.id}`}>
                {t('projects.projectNumber', { id: resource.id })}
            </Link>
        );
    }

    if (resource instanceof Task) {
        return (
            <Link to={`/tasks/${resource.id}`}>
                {t('tasks.taskNumber', { id: resource.id })}
            </Link>
        );
    }

    if (resource instanceof Job) {
        return (
            <Link to={`/tasks/${resource.taskId}/jobs/${resource.id}`}>
                {t('jobs.jobNumber', { id: resource.id })}
            </Link>
        );
    }

    return null;
}

export default React.memo(ResourceLink);
