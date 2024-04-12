import { g_config } from '../config';
import zh_CN from './zh_CN';
import en_US from './en_US';

const langs = {
    zh_CN,
    en_US,
};

export function i18n() {
    const locale = g_config.locale || 'en_US';
    return langs[locale];
}