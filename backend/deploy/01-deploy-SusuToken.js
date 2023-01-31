// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const { network } = require("hardhat");
const fs = require("fs");

module.exports = async function ({ getNamedAccounts, deployments }) {
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();

    log("------------------------------------------------------")
    log("Deploying SusuToken and waiting for confirmations...")

    const susuToken = await deploy("SusuToken", {
        from: deployer,
        args: [],
        log: true,
        waitConfirmations: 1,
    });

    log(`SusuToken deployed at ${susuToken.address}`);
};

module.exports.tags = ["all", "erc20"]