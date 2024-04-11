import { CallbackFunction, IParams } from '../../interface';
import { getFullLink } from '../../utils/url';

class LogStack {
    private _listenCallback!: (params: IParams) => void;

    listen(listenCallbackcallback: CallbackFunction) {
        this._listenCallback = listenCallbackcallback;
    }

    addItem(params: IParams) {
        setTimeout(() => {
            this._listenCallback(params);
        });
    }
}

export const LogStackInstance = new LogStack();

export const IConsole = {
    log: (type: string, msg: any) => {
        console.log(`[FEM-${type}]`, msg);
    },
    warn: (type: string, msg: any) => {
        console.warn(`[FEM-${type}]`, msg);
    },
};

export default function log(feature: string, others?: IParams) {
    const params = {
        feature,
        ...(others || {}),
        url: getFullLink(),
    };
    IConsole.log(feature, params);
    LogStackInstance.addItem(params);
}