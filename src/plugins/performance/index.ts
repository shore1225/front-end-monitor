import { IParams } from '../../interface';
import log from '../log';
import { selectorGenerator } from 'dom-selector-generator';

interface PerformanceProps {
    resourceWarnDuration?: number;
    requestWarnDuration?: number;
    firstInputWarnDuration?: number;
    eventWarnDuration?: number;
    navigationWarnDuration?: number;
    entryTypes?: string[];
    customReport?: (entry: any, log: (feature: string, others?: IParams) => void) => void;
}

export default function performance(props: PerformanceProps) {
    const {
        resourceWarnDuration = 1000,
        requestWarnDuration = 500,
        firstInputWarnDuration = 200,
        eventWarnDuration = 200,
        navigationWarnDuration = 3000,
        entryTypes = [
            'navigation',
            'resource',
            'paint',
            'first-input',
            'event',
        ],
        customReport,
    } = props || {};

    const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
            const {
                entryType,
                duration,
                name,
                initiatorType,
                target,
            } = entry as any;
            if (customReport) {
                customReport(entry, log);
            }
            switch (entryType) {
                case 'resource':
                    if (initiatorType === 'xmlhttprequest') {
                        if (duration >= requestWarnDuration) {
                            log('performance-slow-request', {
                                entryType,
                                initiatorType,
                                duration,
                                name,
                            });
                        }
                    } else {
                        if (duration >= resourceWarnDuration) {
                            log('performance-slow-source', {
                                entryType,
                                initiatorType,
                                duration,
                                name,
                            });
                        }
                    }
                    break;
                case 'first-input':
                    if (duration >= firstInputWarnDuration) {
                        log('performance-slow-first-input', {
                            entryType,
                            initiatorType,
                            duration,
                            name,
                            target: selectorGenerator(target),
                            text: target.innerText,
                        });
                    }
                    break;
                case 'event':
                    if (duration >= eventWarnDuration) {
                        log('performance-slow-event', {
                            entryType,
                            initiatorType,
                            duration,
                            name,
                            target: selectorGenerator(target),
                            text: target.innerText,
                        });
                    }
                    break;
                case 'navigation':
                    if (duration >= navigationWarnDuration) {
                        log('performance-slow-navigation', {
                            entryType,
                            initiatorType,
                            duration,
                            name,
                        });
                    }
                    break;
                default:
                    break;
            }
        }
    })
    observer.observe({
        entryTypes,
    });
}