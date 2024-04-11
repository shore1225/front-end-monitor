import { debounce } from 'lodash';
import log, { IConsole } from '../log';
import { selectorGenerator } from 'dom-selector-generator';

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
            IConsole.warn('event', `expect target: ${target}, set default document`);
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
            log('event', {
                text: (target as HTMLElement)?.innerText || (target as HTMLInputElement)?.value,
                eventType: type,
                selector: selectorGenerator(target as HTMLElement),
            });
        }, 200))
    }
}