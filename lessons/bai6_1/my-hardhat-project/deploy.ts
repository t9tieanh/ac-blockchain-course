import { ethers } from "hardhat";

async function main() {
  const Hello = await ethers.getContractFactory("Hello");
  const hello = await Hello.deploy();

  await hello.waitForDeployment();

  console.log(`Contract deployed to address: ${hello.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});