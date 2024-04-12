# front-end-monitor

前端监控

- 简体中文[zh_CN](README.zh_CN.md)
- English[en_US](README.md)

## 使用 CDN

1. 在 html 中引入 CDN

```
<script src="https://cdn.jsdelivr.net/npm/web-front-end-monitor@latest/lib/main.js"></script>
```

2. 使用 FEM

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

## 使用 npm

1. 安装依赖

```
npm i web-front-end-monitor
```

2. 使用 FEM

```
import FEM from 'web-front-end-monitor';

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

使用某个插件并传入配置

### useAll

```
useAll(config?: { [key: pluginType]: IParams })
```

使用所有插件并传入它们的配置

### log

```
log(feature: string, others?: IParams)
```

自定义日志上报

### subscribe

```
subscribe(callback: CallbackFunction)
```

订阅日志信息

### setGlobalConfig

```
setGlobalConfig(config: GConfig)
```

注入全局配置

- debug: 调试模式 (开启后，将通过 console.log 打印更多信息)
- locale: 国际化 (设置调试模式日志的语言)

## Plugins

### PV

进入页面、离开页面、进入新的路由都会上报信息

- config: --

```
{
    // pv: 进入
    // leave: 离开
    feature,
    // 当前页面 url
    pageUrl,
}
```

### blank

页面加载完成时，监控白屏

- config

| 配置名称 | 默认 | 描述 |
| ---- | ------- | ----------- |
| rootSelector | '#root' | 根节点，根节点无内容，则认为白屏 |

```
{
    // blank: 触发白屏
    feature,
    // 当前页面 url
    pageUrl,
    // 白屏监控节点
    target,
}
```

### event

事件监控(默认监控: `click`, `keydown`)

- config

| 配置名称 | 默认 | 描述 |
| ---- | ------- | ----------- |
| target | -- | 监控区域 |
| events | ['click', 'keydown'] | 监控事件类型 |

```
{
    // event: 事件触发
    feature,
    // 当前页面 url
    pageUrl,
    // 事件触发元素文本
    text,
    // 事件类型
    eventType,
    // 事件触发元素名称
    tagName,
    // 事件触发元素 selector
    selector,
}
```

### js-error

js 报错或没有 catch 的 Promise 报错

- config: --

```
{
    // js-error: js 报错
    // unhandledrejection-error: 没有 catch 的 Promise 报错
    feature,
    // 当前页面 url
    pageUrl,
    // js 资源名称
    filename,
    // 报错基本信息
    message,
    // 报错详细堆栈信息
    stack,
}
```

### performance

web performance like: `navigation`, `resource`...

- config

| 配置名称 | 默认 | 描述 |
| ---- | ------- | ----------- |
| resourceWarnDuration | 1000 (ms) | 慢资源时间阈值 |
| requestWarnDuration | 500 (ms) | 慢请求时间阈值 |
| firstInputWarnDuration | 200 (ms) | 慢首次交互时间阈值 |
| eventWarnDuration | 200 (ms) | 慢事件时间阈值 |
| navigationWarnDuration | 3000 (ms) | 慢导航时间阈值 |
| entryTypes | ['navigation', 'resource', 'paint', 'first-input', 'event'] | 监控类型, 详细见 `https://developer.mozilla.org/en-US/docs/Web/API/PerformanceEntry`  |
| customReport | -- |  `(entry: Event, log: (feature: string, others?: IParams) => void` 自定义上报 |

```
{
    // performance-slow-request: 慢请求
    // performance-slow-source: 慢资源
    // performance-slow-first-input: 慢首次交互
    // performance-slow-event: 慢事件
    // performance-slow-navigation: 慢导航
    feature,
    // 页面 url
    pageUrl,
    // entryTypes 具体项
    entryType,
    // 详细类型
    initiatorType,
    // 消耗事件
    duration,
    // 名称
    name,
    // 目标元素
    target,
    // 目标元素文本
    text,
}
```

### remote

远程请求的各种信息

- config: --

```
{
    // remote: 请求监控
    feature,
    // 页面 url
    pageUrl,
    // 接口 url
    url,
    // params 参数
    params,
    // headers
    headers,
    // body 参数
    body,
    // 请求类型
    method,
    // 持续时间
    duration,
    // 成功或失败信息
    message,
    // XMLHttpRequest 或 fetch 发起
    type,
    // 接口返回
    response,
}
```

### resourceError

script（js 脚本） 或 link（css 样式）加载失败

- config: --

```
{
    // resource-error: 资源错误
    feature,
    // 页面 url
    pageUrl,
    // 资源地址
    source,
    // script（js 脚本） 或 link（css 样式）
    type,
}
```
