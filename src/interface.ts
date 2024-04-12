export type IParams = {
    [key: string]: any;
}

export type CallbackFunction = (any?: any) => void;

export type GConfig = {
    /**
     * debug mode
     * 
     * @if true: console log more information
     * @if false: no log information will be sent
     */
    debug: boolean;
    /**
     * debug mode i18n
     */
    locale: 'zh_CN' | 'en_US';
}