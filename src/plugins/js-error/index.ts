import log from '../log';

export default function jsError() {
    addEventListener('error', ev => {
        const {
            filename,
            error,
        } = ev;
        log('js-error', {
            filename,
            message: error?.message,
            stack: error?.stack,
        });
    });
    addEventListener('unhandledrejection', ev => {
        const { reason } = ev;
        log('unhandledrejection-error', {
            message: reason,
        });
    })
}