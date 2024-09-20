export type AppMessage<T, K = undefined> = {
  type: T;
  payload?: K;
};

export type PluginMessage<T, K = undefined> = {
  pluginMessage: {
    type: T;
    payload?: K;
  };
};
