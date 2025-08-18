import { Connection, BlockResponse, clusterApiUrl, VersionedBlockResponse } from "@solana/web3.js";
import { Block } from "../models/Block";

const RPC_URL = process.env.RPC_URL || "https://api.devnet.solana.com";
const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

export async function fetchBlock(slot: number) : Promise<Block | null> {
    try {
        console.log('here');
        const block: VersionedBlockResponse | null = await connection.getBlock(
            slot,
            {
                commitment: "finalized",
                transactionDetails: "full",
                maxSupportedTransactionVersion: 0,
                rewards: false,
            },
        );
        
        // console.log('CONNECTION', connection);
        if (!block) return null;


        const { blockTime, parentSlot, previousBlockhash, transactions } = block;

        const ix = transactions.map((tx) => ({
            signature: tx.transaction.signatures[0],
            instructions: tx.transaction.message.compiledInstructions[0],
        }));

        console.log(typeof(ix));

        // console.log(transactions);

        return {
            blockTime,
            parentSlot,
            previousBlockhash,
            ix,
            bamOrderingProof: undefined,
            plugins: []
        }
    } catch (error) {
        console.log(error);
        return null;
    }
}

// fetchBlock(377261141);
