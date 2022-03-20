import { HardhatUserConfig } from "hardhat/config";
import "hardhat-gas-reporter";
import "@typechain/hardhat";
//https://hardhat.org/guides/waffle-testing.html
import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-ethers";

import { config } from "./scripts/config";

const hardhatConfig: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  networks: {
    rinkeby: {
      url: config.rinkeby.url,
      accounts: [config.privateKey],
    },
  },
  gasReporter: {
    enabled: true,
    currency: "USD",
    coinmarketcap: config.coinmarketcap,
  },
  mocha: {
    timeout: 120000,
  },
  solidity: {
    version: "0.8.11",
    settings: {
      optimizer: {
        enabled: true,
        runs: 20000,
      },
    },
  },
};

export default hardhatConfig;
