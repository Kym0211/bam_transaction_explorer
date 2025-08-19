import { EnrichedTransaction } from './Transaction';
import { PluginAction } from './PluginAction';

export interface EnrichedBlock {
  slot: number;
  hash: string;
  timestamp: number | null;
  proposer: string;
  transactionCount: number;
  isBAM: boolean;
  mevDetected: boolean;
  transactions: EnrichedTransaction[];
  pluginActions: PluginAction[];
}