import { EnrichedBlock } from '../models/Block';

const MAX_BLOCKS_IN_MEMORY = 20;
const latestBlocks: EnrichedBlock[] = [];

/**
 * Adds a new block to our in-memory store and keeps the list trimmed.
 * @param block The processed block to add.
 */
export const addBlock = (block: EnrichedBlock): void => {
  latestBlocks.unshift(block);

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