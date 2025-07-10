import { ethers } from "hardhat";

async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("Deploying contract with address:", deployer.address);

    const MyNFT = await ethers.getContractFactory("MyNFT");
    const myNFT = await MyNFT.deploy();
    await myNFT.waitForDeployment();

    console.log("MyNFT deployed to:", await myNFT.getAddress());

    // Mint 1 NFT cho deployer
    const tx = await myNFT.mint(deployer.address);
    await tx.wait();
    console.log("Minted NFT to deployer");

    // In ownerOf(0)
    const owner = await myNFT.ownerOf(0);
    console.log("Owner of token 0:", owner);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});