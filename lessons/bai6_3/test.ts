import { ethers } from "ethers";

async function main() {
  const provider = new ethers.JsonRpcProvider("https://eth-sepolia.public.blastapi.io");

  const abi = [
    ""
  ];
  const contractAddress = "0x29435B82B9876C15Ab54Ac21d6F2B551730e2AA6"; // Replace with your contract address
  const contract = new ethers.Contract(contractAddress, abi, provider);

  /**
   * Mint a NFT to deployer
   */
}

main().catch(console.error);
