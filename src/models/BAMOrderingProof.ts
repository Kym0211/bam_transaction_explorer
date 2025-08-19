export interface BAMOrderingProof {
    proof: String;
    verified: boolean;
    slot: number;
    blockHash?: string;
    signatures?: string[];
};