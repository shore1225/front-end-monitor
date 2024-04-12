# front-end-monitor

A front end monitor

- 简体中文[zh_CN](README.zh_CN.md)
- English[en_US](README.md)

## How to use

1. clone to local

```
https://github.com/shore1225/front-end-monitor.git
```

2. use for remote js: you can build it and publish online, build like this

```
npm run build
```

2. use for npm: install it

```
npm i front-end-monitor
```

## Best practices

1. use for remote js: load your resource at HTML

```
<script src="${your resource}"></script>
```

2. use for remote js: load plugins as you wish, and subscribe them

```
<script>
    window.FEM.default.useAll({
        // configs
        PERFORMANCE: { ... },
        ...
    }).subscribe(ev => {
        console.log(ev);
    });
</script>

or

<script>
    window.FEM.default.use('PERFORMANCE', {
        // config
        ...
    }).use('xxx').subscribe(ev => {
        console.log(ev);
    });
</script>
```

3. use for npm

```
import FEM from 'front-end-monitor';

FEM.useAll({
    // configs
    PERFORMANCE: { ... },
    ...
}).subscribe(ev => {
    console.log(ev);
});

or

FEM.use('PERFORMANCE', {
    // config
    ...
}).use('xxx').subscribe(ev => {
    console.log(ev);
});
```

## API

### PluginType

```
type PluginType =
    Plugins.PV |
    Plugins.EVENT |
    Plugins.JS_ERROR |
    Plugins.REMOTE |
    Plugins.RESOURCE_ERROR |
    Plugins.BLANK |
    Plugins.PERFORMANCE;
```

### FEM

#### use

```
use(pluginType: PluginType, config?: IParams)
```

use a plugin with this config

### useAll

```
useAll(config?: { [key: pluginType]: IParams })
```

use all plugin with them config

### log

```
log(feature: string, others?: IParams)
```

custom log

### subscribe

```
subscribe(callback: CallbackFunction)
```

subscribe log

### setGlobalConfig

```
setGlobalConfig(config: GConfig)
```

set global config

- debug: debug mode (console.log system information)
- locale: locale (system information i18n)

## Plugins

### PV

entry page or leave page

- config: --

```
{
    // pv: entry
    // leave: leave
    feature,
    // current page url
    pageUrl,
}
```

### blank

empty content in root element when page complated

- config

| name | default | description |
| ---- | ------- | ----------- |
| rootSelector | '#root' | root node, blank while this node no content |

```
{
    // blank: blank warn
    feature,
    // current page url
    pageUrl,
    // root node
    target,
}
```

### event

event monitor(default: `click`, `keydown`)

- config

| name | default | description |
| ---- | ------- | ----------- |
| target | -- | monitor area |
| events | ['click', 'keydown'] | event type |

```
{
    // event: event
    feature,
    // current page url
    pageUrl,
    // target element text
    text,
    // event type
    eventType,
    // target element tag name
    tagName,
    // target element selector
    selector,
}
```

### js-error

js error or uncatch's promise

- config: --

```
{
    // js-error: js error
    // unhandledrejection-error: unhandled rejection for Promise
    feature,
    // current page url
    pageUrl,
    // js source name
    filename,
    // error message
    message,
    // error detail message
    stack,
}
```

### performance

web performance like: `navigation`, `resource`...

- config

| name | default | description |
| ---- | ------- | ----------- |
| resourceWarnDuration | 1000 (ms) | slow resource max duration |
| requestWarnDuration | 500 (ms) | slow request max duration |
| firstInputWarnDuration | 200 (ms) | slow first input max duration |
| eventWarnDuration | 200 (ms) | slow event max duration |
| navigationWarnDuration | 3000 (ms) | slow navigation max duration |
| entryTypes | ['navigation', 'resource', 'paint', 'first-input', 'event'] | monitor types, all type at `https://developer.mozilla.org/en-US/docs/Web/API/PerformanceEntry`  |
| customReport | -- |  `(entry: Event, log: (feature: string, others?: IParams) => void` you can custom report |

```
{
    // performance-slow-request: slow request
    // performance-slow-source: slow source
    // performance-slow-first-input: slow first input
    // performance-slow-event: slow event
    // performance-slow-navigation: slow navigation
    feature,
    // current page url
    pageUrl,
    // entryTypes item
    entryType,
    // detail type
    initiatorType,
    // duration
    duration,
    // name
    name,
    // target element
    target,
    // target element text
    text,
}
```

### remote

remote request duration, params, url...

- config: --

```
{
    // remote: remote request
    feature,
    // current page url
    pageUrl,
    // request url
    url,
    // params
    params,
    // headers
    headers,
    // body
    body,
    // method
    method,
    // duration
    duration,
    // message for success or failed
    message,
    // XMLHttpRequest or fetch
    type,
    // response
    response,
}
```

### resourceError

script or link load failed

- config: --

```
{
    // resource-error: resource error
    feature,
    // current page url
    pageUrl,
    // source url
    source,
    // script or link
    type,
}
```
