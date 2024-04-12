import { g_config } from './config';
import { CallbackFunction, GConfig, IParams } from './interface';
import { PluginType, plugins } from './plugins';
import log, { LogStackInstance } from './plugins/log';

class FEM {
  /**
   * subscribe to monitor information
   * 
   * @param callback you can get the monitoring information in this callback method
   */
  subscribe(callback: CallbackFunction) {
    LogStackInstance.listen(callback);
  }

  /**
   * use a plugin
   * 
   * @param pluginType plugin type
   * @param config pligin config
   */
  use(pluginType: PluginType, config?: IParams) {
    plugins[pluginType](config);
    return this;
  }

  /**
   * use all plugins
   * 
   * @param config plugin config 
   */
  useAll(config?: IParams) {
    for (const key in plugins) {
      const pluginParams = config && config[key];
      !!pluginParams ? this.use(key as PluginType, pluginParams) : this.use(key as PluginType);
    }
    return this;
  }

  /**
   * report extra information
   * 
   * @param feature feature
   * @param others information
   */
  log(feature: string, others?: IParams) {
    log(feature, others);
  }

  /**
   * set global config for FEM
   * 
   * @param config config like GConfig
   */
  setGlobalConfig(config: GConfig) {
    for (const configName in config || {}) {
      const configValue = Reflect.get(config, configName);
      Reflect.set(g_config, configName, configValue);
    }
    return this;
  }
}

export default new FEM();