import { CallbackFunction } from '../../interface';

export function routerChange(callback: CallbackFunction) {
    addEventListener('hashchange', callback);
    addEventListener('popstate', callback);
    const originPushState = history?.pushState;
    if (!!originPushState) {
        history.pushState = function() {
            originPushState.apply(this, arguments as any);
            callback();
        }
    }
    const originReplaceState = history?.replaceState;
    if (!!originReplaceState) {
        history.replaceState = function(state, _, url) {
            originReplaceState.apply(this, arguments as any);
            if (history.state === null && state?.idx === 0 && !url) return;
            callback();
        }
    }
}

export function routerLeave(callback: CallbackFunction) {
    addEventListener('beforeunload', callback);
}