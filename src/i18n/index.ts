import { g_config } from '../config';
import zh_CN from './zh_CN';
import en_US from './en_US';

const langs = {
    zh_CN,
    en_US,
};

type I18nReplace = {
    [key: string]: string;
}

export function i18n(key: string, replace?: I18nReplace) {
    const locale = g_config.locale || 'en_US';
    const i18nTemplate = (langs[locale] as any)[key];
    if (!i18nTemplate) return '';
    if (!replace) return i18nTemplate;
    return Object.keys(replace).reduce((pre, nxt) => {
        const tempKey = nxt;
        const tempValue = replace[nxt];
        return pre.replace('${' + tempKey + '}', tempValue);
    }, i18nTemplate);
}