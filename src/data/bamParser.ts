import { BAMOrderingProof } from "../models/BAMOrderingProof";

export function parseOrderingProof(rawProof: any, slot: number) : BAMOrderingProof {
    return {
        proof: rawProof.proofData,
        verified: verifyProof(rawProof.proofData, slot),
        slot,
        blockHash: rawProof.blockHash,
        signatures: rawProof.signatures
    }
}

function verifyProof(proofData: string, slot: number): boolean {
  // TODO: Implement or call Jito-provided proof verifier
  return !!proofData; // For now, treat any non-empty data as verified
}