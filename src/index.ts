import { CallbackFunction, IParams } from './interface';
import { PluginType, plugins } from './plugins';
import log, { LogStackInstance } from './plugins/log';

class FEM {
  subscribe(callback: CallbackFunction) {
    LogStackInstance.listen(callback);
  }

  use(pluginType: PluginType, config?: IParams) {
    plugins[pluginType](config);
    return this;
  }

  useAll(config?: IParams) {
    for (const key in plugins) {
      const pluginParams = config && config[key];
      !!pluginParams ? this.use(key as PluginType, pluginParams) : this.use(key as PluginType);
    }
    return this;
  }

  log(feature: string, others?: IParams) {
    log(feature, others);
  }
}

export default new FEM();