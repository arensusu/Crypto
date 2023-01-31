require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config()
require("hardhat-deploy")

const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY
const WALLET_PRIVATE_KEY = process.env.WALLET_PRIVATE_KEY
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY
module.exports = {
  solidity: "0.8.17",
  
  defaultNetwork: "hardhat",

  networks: {
    hardhat: {
      chainId: 31337,
    },

    goerli: {
      url: ALCHEMY_API_KEY,
      accounts: [WALLET_PRIVATE_KEY],
      chainId: 5,
    },
  },

  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },

  namedAccounts: {
    deployer: {
      default: 0,
      1: 0,
    },
  }
};
