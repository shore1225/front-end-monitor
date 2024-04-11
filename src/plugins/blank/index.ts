import log from '../log';

interface BlankProps {
    rootSelector: string;
}

export default function blank(props: BlankProps) {
    const { rootSelector = '#root' } = props || {};
    const timer = setInterval(() => {
        if (document.readyState === 'complete') {
            const rootEl = document.querySelector(rootSelector);
            if (!!rootEl) {
                if (!!rootEl.innerHTML) {
                    clearInterval(timer);
                }
            }
            log('blank', {
                target: rootSelector,
            });
            clearInterval(timer);
        }
    }, 1000);
}