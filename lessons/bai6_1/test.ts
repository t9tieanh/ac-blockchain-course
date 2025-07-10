import { ethers } from "ethers";

async function main() {
  const provider = new ethers.JsonRpcProvider("https://eth-sepolia.public.blastapi.io");

  const abi = [
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function decimals() view returns (uint8)",
    "function totalSupply() view returns (uint256)",
    "function balanceOf(address account) view returns (uint256)"
  ];

  const contractAddress = "0x31d0Fb929da965D2C4eEF19937bf34A2006C885b";
  const contract = new ethers.Contract(contractAddress, abi, provider);

  const name = await contract.name();
  const symbol = await contract.symbol();
  const decimals = await contract.decimals();
  const totalSupply = await contract.totalSupply();

  console.log(`Token Name: ${name}`);
  console.log(`Token Symbol: ${symbol}`);
  console.log(`Decimals: ${decimals}`);
  console.log(`Total Supply: ${ethers.formatUnits(totalSupply, decimals)}`);

  const deployerAddress = "0x3d6a96d41f4331B97A814CEF25407278b79e3BE8";
  const balance = await contract.balanceOf(deployerAddress);

  console.log(`Balance of deployer (${deployerAddress}): ${ethers.formatUnits(balance, decimals)} ${symbol}`);
}

main().catch(console.error);
