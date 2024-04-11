import pv from './pv';
import event from './event';
import jsError from './js-error';
import remote from './remote';
import resourceError from './resource-error';
import blank from './blank';
import performance from './performance';

export enum Plugins {
    PV = 'PV',
    EVENT = 'EVENT',
    JS_ERROR = 'JS_ERROR',
    REMOTE = 'REMOTE',
    RESOURCE_ERROR = 'RESOURCE_ERROR',
    BLANK = 'BLANK',
    PERFORMANCE = 'PERFORMANCE',
}

export type PluginType = Plugins.PV | Plugins.EVENT | Plugins.JS_ERROR | Plugins.REMOTE | Plugins.RESOURCE_ERROR | Plugins.BLANK | Plugins.PERFORMANCE;

type PluginMap = {
    [key: string]: (params?: any) => void;
}

export const plugins: PluginMap = {
    [Plugins.PV]: pv,
    [Plugins.EVENT]: event,
    [Plugins.JS_ERROR]: jsError,
    [Plugins.REMOTE]: remote,
    [Plugins.RESOURCE_ERROR]: resourceError,
    [Plugins.BLANK]: blank,
    [Plugins.PERFORMANCE]: performance,
};
