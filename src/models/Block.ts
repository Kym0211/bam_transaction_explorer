import { Transaction } from "@solana/web3.js";

export interface Block {
    blockTime: number | null;
    parentSlot: number;
    previousBlockhash: string;
    ix: object;
    bamOrderingProof: undefined;
    plugins: [];
}