import { IParams } from '../../interface';
import log from '../log';

function fetchHandle() {
    const originFetch = window.fetch;
    window.fetch = function (input: RequestInfo | URL, init?: RequestInit | undefined) {
        const remoteUrl = typeof input === 'object' ? ((input as Request).url || (input as URL).href) : input;
        const [url, params] = remoteUrl.split('?');
        const method = init?.method || (input as Request).method || 'GET';
        const headers = String(init?.headers || (input as Request).headers);
        const body = String(init?.body || (input as Request).body);
        const startTime = new Date().getTime();
        const type = 'fetch';
        return originFetch.apply(window, arguments as any).then(async response => {
            const duration = new Date().getTime() - startTime;
            let res;
            try {
                res = await response.json();
            } catch (error) {
                
            } finally {
                log('remote', {
                    url,
                    params,
                    headers,
                    body,
                    method,
                    duration,
                    message: 'resolved',
                    type,
                    response: res,
                });
                return response;
            }
        }).catch(err => {
            const duration = new Date().getTime() - startTime;
            log('remote', {
                url,
                params,
                headers,
                body,
                method,
                duration,
                message: 'rejected: ' + String(err),
                type,
                response: '',
            });
            throw err;
        });
    }
}

const signMap: IParams = {};

function XHRHandle() {
    if (typeof XMLHttpRequest !== 'function') return;
    const originXMLHttpRequest = window.XMLHttpRequest;
    const originOpen = originXMLHttpRequest.prototype.open;
    const originSend = originXMLHttpRequest.prototype.send;
    const originSetRequestHeader = originXMLHttpRequest.prototype.setRequestHeader;
    const currentSign = 'FEM_' + Math.random();
    originXMLHttpRequest.prototype.open = function (method, url) {
        originOpen.apply(this, arguments as any);
        signMap[currentSign] = { method, inputUrl: url };
    }
    originXMLHttpRequest.prototype.setRequestHeader = function (name, value) {
        originSetRequestHeader.apply(this, arguments as any);
        if (signMap[currentSign]) {
            if (!signMap[currentSign].headers) {
                signMap[currentSign].headers = {};
            }
            signMap[currentSign].headers[name] = value;
        }
    }
    originXMLHttpRequest.prototype.send = function (body) {
        originSend.apply(this, arguments as any);
        if (!signMap[currentSign]) return;
        const { inputUrl, method = 'GET', headers } = signMap[currentSign];
        delete signMap[currentSign];
        const remoteUrl = inputUrl.href || inputUrl || '';
        const [url, params] = remoteUrl.split('?');
        const startTime = new Date().getTime();
        const type = 'XMLHttpRequest';
        let status = 0;
        const xhr = this;
        const onLoaded = () => {
            status = xhr.status || status;
            const duration = new Date().getTime() - startTime;
            let responseType = xhr.responseType || 'text';
            let response;
            let message = '';
            if (responseType === 'text' || responseType === 'json') {
                response = xhr.response;
            } else if (responseType === 'blob' && (xhr.response?.type === 'application/json' || xhr.response?.type === 'text/plain') && xhr.response?.text) {
                xhr.response.text().then((res: any) => {
                    response = res;
                    message = 'resolved';
                }).catch((err: any) => {
                    message = 'rejected: ' + String(err);
                });
            } else {
                response = String(xhr.response);
            }
            log('remote', {
                url,
                params,
                headers,
                body,
                method,
                duration,
                message,
                type,
                response: '',
            });
        }
        if (xhr.onloadend !== undefined) {
            xhr.addEventListener('abort', () => status = -2);
            xhr.addEventListener('timeout', () => status = -3);
            xhr.addEventListener('loadend', onLoaded);
        } else {
            xhr.addEventListener('readystatechange', () => {
                if (xhr.readyState === 4) {
                    onLoaded();
                }
            })
        }
    }
}

export default function remote() {
    try {
        fetchHandle();
        XHRHandle();
    } catch (error) {
        
    }
}