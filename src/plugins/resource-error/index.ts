import log from '../log';

export default function resourceError() {
    addEventListener('error', ev => {
        if (!(ev instanceof ErrorEvent)) {
            const target = (ev as Event).target as (HTMLScriptElement | HTMLLinkElement);
            const source = (target as HTMLScriptElement).src || (target as HTMLLinkElement).href;
            log('resource-error', {
                source,
                type: target.tagName,
            });
        }
    }, true);
}