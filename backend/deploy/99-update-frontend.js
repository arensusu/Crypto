const { ethers, network } = require("hardhat");
const fs = require("fs");
const { susuTokenFrontendAddressFile, susuTokenFrontendAbi } = require("../helper-hardhat-config");

module.exports = async () => {
    console.log("Updating frontend contract address file and abi file...");
    await updateAbi();
    await updateAddress();
    console.log("Frontend files updated.")
}

async function updateAbi() {
    const susuToken = await ethers.getContract("SusuToken");

    fs.writeFileSync(
        susuTokenFrontendAbi,
        susuToken.interface.format(ethers.utils.FormatTypes.json)
    );
}

async function updateAddress() {
    const susuToken = await ethers.getContract("SusuToken");

    const contractAddress = JSON.parse(fs.readFileSync(susuTokenFrontendAddressFile, "utf8"));
    const chainId = network.config.chainId.toString();

    if (chainId in contractAddress) {
        if (!contractAddress[chainId].includes(susuToken.address)) {
            contractAddress[chainId].push(susuToken.address);
        }
    }
    else {
        contractAddress[chainId] = [susuToken.address];
    }

    fs.writeFileSync(susuTokenFrontendAddressFile, JSON.stringify(contractAddress));
}

module.exports.tags = ["all", "frontend"];