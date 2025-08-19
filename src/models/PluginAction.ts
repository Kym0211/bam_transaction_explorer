export interface PluginAction {
  pluginName: string;
  actionType: 'OracleUpdate' | 'PriorityCancel' | 'Unknown';
  // Add more details later
}