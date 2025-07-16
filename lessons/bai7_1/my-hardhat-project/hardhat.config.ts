import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "dotenv/config";

const config: HardhatUserConfig = {
  solidity: "0.8.20",
  networks: {
    sepolia: {
      url: `https://eth-sepolia.public.blastapi.io`,
      accounts: [
        process.env.PRIVATE_KEY1 as string,
        process.env.PRIVATE_KEY2 as string
      ],
    },
  },
};

export default config;
