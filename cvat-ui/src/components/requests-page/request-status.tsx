// Copyright (C) CVAT.ai Corporation
//
// SPDX-License-Identifier: MIT

import React from 'react';
import { useTranslation } from 'react-i18next';
import Text from 'antd/lib/typography/Text';
import { BaseType } from 'antd/es/typography/Base';
import LoadingOutlined from '@ant-design/icons/lib/icons/LoadingOutlined';
import { RQStatus } from 'cvat-core-wrapper';
import { translateRequestMessage } from 'utils/i18n-labels';

function statusMessage(message: string, defaultMessage: string, postfix?: JSX.Element): JSX.Element {
    const displayMessage = message ? translateRequestMessage(message) : defaultMessage;
    if (message) {
        return (
            <>
                {displayMessage}
                {postfix || null}
            </>
        );
    }

    return (
        <>
            {defaultMessage}
            {postfix || null}
        </>
    );
}

export interface Props {
    status: RQStatus | null;
    message: string | null;
    cancelled?: boolean;
}

function StatusMessage(props: Props): JSX.Element {
    const { t } = useTranslation();
    const { cancelled } = props;
    let { status, message } = props;
    message = message || '';
    status = status || RQStatus.FINISHED;

    const [textType, classHelper] = ((_status: RQStatus) => {
        if (cancelled || _status === RQStatus.CANCELED) {
            return [undefined, 'cancelled'];
        }

        if (_status === RQStatus.FINISHED) {
            return ['success', 'success'];
        }

        if (_status === RQStatus.QUEUED) {
            return ['warning', 'queued'];
        }

        if (_status === RQStatus.STARTED) {
            return [undefined, 'started'];
        }

        return ['danger', 'failed'];
    })(status);

    return (
        <Text
            className={`cvat-request-item-progress-message cvat-request-item-progress-${classHelper}`}
            type={textType as BaseType | undefined}
            strong
        >
            {((): JSX.Element => {
                if (cancelled || status === RQStatus.CANCELED) {
                    return statusMessage(message, t('requests.cancelled'));
                }

                if (status === RQStatus.FINISHED) {
                    return statusMessage(message, t('requests.finished'));
                }

                if ([RQStatus.QUEUED].includes(status)) {
                    return statusMessage(message, t('requests.queued'), <LoadingOutlined />);
                }

                if ([RQStatus.STARTED].includes(status)) {
                    return statusMessage(message, t('requests.inProgress'), <LoadingOutlined />);
                }

                if (status === RQStatus.FAILED) {
                    return statusMessage(message, t('requests.failed'));
                }

                if (status === RQStatus.UNKNOWN) {
                    return statusMessage(message, t('requests.unknownStatus'));
                }

                return statusMessage(message, t('requests.unknownStatus'));
            })()}
        </Text>
    );
}

export default React.memo(StatusMessage);
