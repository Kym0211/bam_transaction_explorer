import { ParsedAccountsModeBlockResponse, ParsedBlockResponse } from "@solana/web3.js";
import { log } from "console";

// A list of well-known DEX and DeFi program IDs on Solana.
// This list can be expanded over time.
const KNOWN_DEX_PROGRAM_IDS = new Set([
  'JUP6LkbZbjS1jKKwapdHNy74zcZ3tLUZoi5QNyVTaV4', // Jupiter Aggregator
  '675kPX9MHTjS2zt1qfr1NYHuzeLXfQM9H24wFSUt1Mp8', // Raydium AMM V4
  '9W959DqEETiGZocYWCQPaJ6sHzM_b7hT_bT',         // Orca Whirlpools
  'CURVGoZn8zyCue4e2wJq1cBenFCR2sRqrB6SGiweC41', // Curve
  // Add other major protocols here...
]);

/**
 * A simplified MEV detector for the MVP.
 * It checks if any transaction in the block interacts with a known DEX program.
 * @param block The full, parsed block response from the RPC.
 * @returns An object indicating whether potential MEV activity was detected.
 */
export const detectMEV = (block: ParsedAccountsModeBlockResponse): { mevDetected: boolean } => {
  try {

    // log(block.transactions[0].transaction.accountKeys);
    block.transactions.map((transaction) => {
      transaction.transaction.accountKeys.map((key) => {
        if (KNOWN_DEX_PROGRAM_IDS.has(key.pubkey.toString())) {
          // console.log(key.pubkey.toString(), ": found")
          return {mevDetected: true}
        }
      })
    })
  } catch (error) {
    // If parsing fails, assume no MEV.
    log("error: ", error)
  }

  // If no transactions interacted with our known DEX list, return false.
  return { mevDetected: false };
};