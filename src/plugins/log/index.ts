import { g_config } from '../../config';
import { i18n } from '../../i18n';
import { CallbackFunction, IParams } from '../../interface';
import { getFullLink } from '../../utils/url';

class LogStack {
    private _listenCallback!: (params: IParams) => void;

    listen(listenCallbackcallback: CallbackFunction) {
        this._listenCallback = listenCallbackcallback;
    }

    addItem(params: IParams) {
        setTimeout(() => {
            if (!!this._listenCallback) {
                this._listenCallback(params);
            } else {
                IConsole.warn('global', i18n().CALLBACK_METHOD_DOES_NOT_EXIST);
            }
        });
    }
}

export const LogStackInstance = new LogStack();

export const IConsole = {
    log: (type: string, msg: any) => {
        g_config.debug && console.log(`[FEM-${type}]`, msg);
    },
    warn: (type: string, msg: any) => {
        g_config.debug && console.warn(`[FEM-${type}]`, msg);
    },
};

export default function log(feature: string, others?: IParams) {
    const params = {
        feature,
        ...(others || {}),
        pageUrl: getFullLink(),
    };
    IConsole.log(feature, params);
    LogStackInstance.addItem(params);
}