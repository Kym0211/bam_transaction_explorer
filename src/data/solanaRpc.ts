// import { RPC_URL, WSS_URL } from './../config/env';
import { clusterApiUrl, Connection, PublicKey } from '@solana/web3.js';
import { EnrichedBlock } from '../models/Block';
import { addBlock } from '../db/inMemoryStore';
import { parseBAMInfo } from './bamParser';
import { detectMEV } from './mevDetector';

// const RPC_URL = process.env.RPC_URL;
// const WSS_URL = process.env.WSS_URL;
const RPC_URL="https://devnet.helius-rpc.com/?api-key=7bb20abd-ffdb-4e81-a50b-59ebec40c6ce"
const WSS_URL="wss://devnet.helius-rpc.com/?api-key=7bb20abd-ffdb-4e81-a50b-59ebec40c6ce"
// console.log(process.env.RPC_URL);

// const JITO_TIP_PROGRAM_ID = new PublicKey('J1T1o1G1V1L1L1L1L1L1L1L1L1L1L1L1L1L1L1L1');

if (!RPC_URL) {
  throw new Error('RPC_URL is not defined. Please set the RPC_URL environment variable.');
}
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
        mevDetected: true,
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
