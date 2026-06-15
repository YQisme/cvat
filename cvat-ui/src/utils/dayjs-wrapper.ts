// Copyright (C) CVAT.ai Corporation
//
// SPDX-License-Identifier: MIT

import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';

import advancedFormat from 'dayjs/plugin/advancedFormat';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import localeData from 'dayjs/plugin/localeData';
import relativeTime from 'dayjs/plugin/relativeTime';
import weekday from 'dayjs/plugin/weekday';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import weekYear from 'dayjs/plugin/weekYear';
import duration from 'dayjs/plugin/duration';
import utc from 'dayjs/plugin/utc';

dayjs.extend(customParseFormat);
dayjs.extend(advancedFormat);
dayjs.extend(relativeTime);
dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(weekOfYear);
dayjs.extend(weekYear);
dayjs.extend(duration);
dayjs.extend(relativeTime);
dayjs.extend(utc);

export function setDayjsLocale(language: string): void {
    dayjs.locale(language.startsWith('zh') ? 'zh-cn' : 'en');
}

export function formatLongDate(date: string | number | Date): string {
    const value = dayjs(date);
    return value.locale() === 'zh-cn' ? value.format('YYYY年M月D日') : value.format('MMMM Do YYYY');
}

export function formatFromNow(date: string | number | Date): string {
    return dayjs(date).fromNow();
}

export default dayjs;
