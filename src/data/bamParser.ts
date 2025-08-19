import { Connection, ParsedAccountsModeBlockResponse, ParsedBlockResponse, ParsedInstruction } from "@solana/web3.js";

/**
 * Determines if a block was produced by a Jito validator by checking for a Jito memo
 * in the last transaction of the block.
 * @param block The full, parsed block response from the RPC.
 * @returns An object indicating whether the block is a Jito BAM block.
 */

//ParsedAccountsModeBlockResponse
export const parseBAMInfo = async (connection: Connection, slot: number): Promise<{ isBAM: boolean; }> => {
  try {

    const leader = await connection.getSlotLeaders(slot, 1).toString();
    // If a block is proposed by jito validators then return true
      if (leader.includes("J1to")) {
        return {isBAM: true}
      }


    return {isBAM: true};
  } catch (error) {
    // If anything goes wrong during parsing, assume it's not a Jito block.
    console.error("Error parsing for Jito memo:", error);
  }

  // If we get here, no Jito memo was found.
  return { isBAM: false };
};