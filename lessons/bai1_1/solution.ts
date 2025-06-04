import crypto from "crypto";

export type Block = {
  index: number;
  timestamp: string;
  transactions: any[];
  previous_hash: string;
  current_hash: string;
};

// ✍️ TODO: Viết hàm tại đây
export function isValidBlock(block: Block): boolean {
  const dataToHash = 
    block.index +
    block.timestamp +
    JSON.stringify(block.transactions) +
    block.previous_hash;

  return block.current_hash === crypto.createHash("sha256").update(dataToHash).digest("hex");
}
