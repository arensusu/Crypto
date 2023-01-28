// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const { ethers } = require("hardhat");
const fs = require("fs");

async function main() {
  const SusuTokenFactory = await ethers.getContractFactory("SusuToken");
  const SusuToken = await SusuTokenFactory.deploy();

  await SusuToken.deployed();
  fs.writeFileSync("./crypto-front/constants/abi.json", SusuToken.interface.format(ethers.utils.FormatTypes.json))
  fs.writeFileSync("./crypto-front/constants/contractAddress.json", JSON.stringify(SusuToken.address))
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
