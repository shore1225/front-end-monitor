# front-end-monitor

A front end monitor

## How to use

1. clone to local

```
https://github.com/shore1225/front-end-monitor.git
```

2. you can build it and publish online, build like this

```
npm run build
```

## Best practices

1. load your resource at HTML

```
<script src="${your resource}"></script>
```

2. load plugins as you wish, and subscribe them

```
<script>
    window.FEM.useAll({
        // configs
        PERFORMANCE: { ... },
        ...
    }).subscribe(ev => {
        console.log(ev);
    });
</script>

or

<script>
    window.FEM.use('PERFORMANCE', {
        // config
        ...
    }).use('xxx').subscribe(ev => {
        console.log(ev);
    });
</script>
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
use(pluginType: PluginType, config?: IParams) => void
```

use a plugin with this config

### useAll

```
useAll(config?: { [key: pluginType]: IParams }) => void
```

use all plugin with them config

### log

```
log(feature: string, others?: IParams) => void
```

custom log

### subscribe

```
subscribe(callback: CallbackFunction) => void
```

subscribe log

## Plugins

### PV

entry page or leave page

- config: --

### blank

empty content in root element when page complated

- config

| name | default | description |
| ---- | ------- | ----------- |
| rootSelector | '#root' | root node |

### event

event monitor(default: `click`, `keydown`)

- config

| name | default | description |
| ---- | ------- | ----------- |
| target | -- | monitor area |
| events | ['click', 'keydown'] | event type |

### js-error

js error or uncatch's promise

- config: --

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

### remote

remote request duration, params, url...

- config: --

### resourceError

script or link load failed

- config: --
