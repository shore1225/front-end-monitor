import { debounce } from 'lodash';
import log, { IConsole } from '../log';
import { selectorGenerator } from 'dom-selector-generator';
import { i18n } from '../../i18n';

interface EventConfig {
    target?: string;
    events?: string[];
}

function getTarget(target?: string) {
    if (!!target) {
        const dom = document.querySelector(target);
        if (!!dom) {
            return dom;
        } else {
            IConsole.warn('event', i18n('TARGET_NOT_FOUND', { target }));
            return document;
        }
    } else {
        return document;
    }
}

export default function event(props: EventConfig) {
    const {
        target = '',
        events = ['click', 'keydown'],
    } = props || {};
    for (const ev of events) {
        getTarget(target).addEventListener(ev, debounce(({ target, type }) => {
            const tagName = target.tagName.toLowerCase();
            if (type === 'click') {
                if (['button', 'a', 'input'].includes(tagName) || getComputedStyle(target).cursor === 'pointer') {
                    log('event', {
                        text: (target as HTMLElement)?.innerText || (target as HTMLInputElement)?.value,
                        eventType: type,
                        tagName,
                        selector: selectorGenerator(target as HTMLElement),
                    });
                }
                return;
            } else if (type === 'keydown') {
                if (['textarea', 'input'].includes(tagName)) {
                    log('event', {
                        text: (target as HTMLElement)?.innerText || (target as HTMLInputElement)?.value,
                        eventType: type,
                        tagName,
                        selector: selectorGenerator(target as HTMLElement),
                    });
                }
                return;
            }
            log('event', {
                text: (target as HTMLElement)?.innerText || (target as HTMLInputElement)?.value,
                eventType: type,
                tagName,
                selector: selectorGenerator(target as HTMLElement),
            });
        }, 500))
    }
}