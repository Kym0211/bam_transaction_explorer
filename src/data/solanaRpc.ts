// import { RPC_URL, WSS_URL } from './../config/env';
import { clusterApiUrl, Connection } from '@solana/web3.js';
import { EnrichedBlock } from '../models/Block';
import { addBlock } from '../db/inMemoryStore';
import { parseBAMInfo } from './bamParser';
import { detectMEV } from './mevDetector';

const connection = new Connection(clusterApiUrl("mainnet-beta"), {
    commitment: "confirmed"
});
export const startWorker =async (slot: number) => {
  console.log('🚀 Starting Solana Live Worker...');

    try {
      const block = await connection.getParsedBlock(slot, {
        // encoding: 'jsonParsed',
        maxSupportedTransactionVersion: 0,
        transactionDetails: "accounts", // Ensures ParsedBlockResponse is returned
      });

      if (!block) return;
      const leader = (await connection.getSlotLeaders(slot, 1)).toString();
      console.log(leader);
      if (leader.includes("J1to")) {
        console.log("jito block");
      }

      // Use our parsers to enrich the data
      const { isBAM } = await parseBAMInfo(connection, slot);
      const { mevDetected } = detectMEV(block);

      // Create our final, structured block object
      const enrichedBlock: EnrichedBlock = {
        slot: slot,
        hash: block.blockhash,
        timestamp: block.blockTime ?? null,
        proposer: block.rewards?.[0]?.pubkey ?? 'Unknown',
        transactionCount: block.transactions.length,
        isBAM,
        mevDetected,
        transactions: [], // For MVP, we'll keep this simple
        pluginActions: [], // For MVP, we'll keep this simple
      };

      // Add the processed block to our in-memory store
      addBlock(enrichedBlock);

    } catch (error) {
      // It's common for public RPCs to fail, so we log and continue
      console.error(`Failed to process slot:`, error);
    }
};
