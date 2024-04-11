import { CallbackFunction, IParams } from '../../interface';
import { getFullLink } from '../../utils/url';
import { cloneDeep } from 'lodash';

class LogStack {
    private _value: IParams[] = [];
    private _listenCallback!: (params: IParams[]) => void;

    constructor() {
        setInterval(() => {
            if (this._value.length > 0 && !!this._listenCallback) {
                this._listenCallback(this.consume());
            }
        }, 5000);
    }

    listen(listenCallbackcallback: CallbackFunction) {
        this._listenCallback = listenCallbackcallback;
    }

    addItem(params: IParams) {
        this._value.push(params);
    }

    addSome(paramsArray: IParams[]) {
        this._value.push(paramsArray);
    }

    consume() {
        const source = cloneDeep(this._value);
        this._value = [];
        return source;
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