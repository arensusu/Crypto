const { ethers } = require("hardhat");
const { fs } = require("fs");

module.exports = async () => {
    const SusuToken = await ethers.getContract("SusuToken");

    fs.writeFileSync(
        "./crypto-front/constants/abi.json",
        SusuToken.interface.format(ethers.utils.FormatTypes.json)
    );
    fs.writeFileSync(
        "./crypto-front/constants/contractAddress.json",
        JSON.stringify(SusuToken.address)
    );
}