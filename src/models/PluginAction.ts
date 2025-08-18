export interface PluginAction {
    name: string;
    actionType: string;
    transactionIds: string[];
    details?: any;
}