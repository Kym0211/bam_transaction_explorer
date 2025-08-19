import { EnrichedBlock } from '../models/Block';

// We will store the last 20 blocks in memory.
const MAX_BLOCKS_IN_MEMORY = 20;
const latestBlocks: EnrichedBlock[] = [];

/**
 * Adds a new block to our in-memory store and keeps the list trimmed.
 * @param block The processed block to add.
 */
export const addBlock = (block: EnrichedBlock): void => {
  // Add the new block to the beginning of the array
  latestBlocks.unshift(block);

  // If the array is too long, remove the oldest element
  if (latestBlocks.length > MAX_BLOCKS_IN_MEMORY) {
    latestBlocks.pop();
  }
};

/**
 * Retrieves all blocks currently in the store.
 * @returns An array of the latest blocks.
 */
export const getBlocks = (): EnrichedBlock[] => {
  return latestBlocks;
};