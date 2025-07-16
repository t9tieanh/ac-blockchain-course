import { ethers } from "hardhat";

async function main() {
  const [deployer, recipient] = await ethers.getSigners();

  console.log("Deployer address:", deployer.address);
  console.log("Recipient address:", recipient.address);

  // Deploy contract
  const Token = await ethers.getContractFactory("MyMintableToken");
  const token = await Token.deploy();
  await token.waitForDeployment();

  console.log("MyMintableToken deployed to:", await token.getAddress());

  // Mint 1000 token cho deployer
  const mintTx = await token.mint(deployer.address, ethers.parseUnits("1000", 18));
  await mintTx.wait();
  console.log(`Minted 1000 tokens to ${deployer.address}`);

  // Kiểm tra balance trước khi transfer
  let deployerBalance = await token.balanceOf(deployer.address);
  let recipientBalance = await token.balanceOf(recipient.address);

  console.log(`Before transfer:`);
  console.log(`  Deployer balance: ${ethers.formatUnits(deployerBalance, 18)}`);
  console.log(`  Recipient balance: ${ethers.formatUnits(recipientBalance, 18)}`);

  // Transfer 100 token cho recipient
  const transferTx = await token.transfer(recipient.address, ethers.parseUnits("100", 18));
  await transferTx.wait();
  console.log(`Transferred 100 tokens from ${deployer.address} to ${recipient.address}`);

  // Kiểm tra lại balance
  deployerBalance = await token.balanceOf(deployer.address);
  recipientBalance = await token.balanceOf(recipient.address);

  console.log(`After transfer:`);
  console.log(`  Deployer balance: ${ethers.formatUnits(deployerBalance, 18)}`);
  console.log(`  Recipient balance: ${ethers.formatUnits(recipientBalance, 18)}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
