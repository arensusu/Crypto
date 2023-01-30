const { ethers } = require("hardhat")
const { expect, assert } = require("chai")

describe("SusuToken", function() {

    let susutoken
    beforeEach(async function () {
        const susutokenFactory = await ethers.getContractFactory("SusuToken")
        susutoken = await susutokenFactory.deploy()
    })

    it("Name should be SusuToken", async function () {
        const expectedName = "SusuToken"
        const realName = await susutoken.name()

        assert.equal(realName, expectedName)
    })

    it("Symbol should be SST", async function () {
        const expectedSymbol = "SST"
        const realSymbol = await susutoken.symbol()

        assert.equal(realSymbol, expectedSymbol)
    })

    it("Total Supply should be 1000 ether", async function () {
        const expectedTotalSupply = ethers.utils.parseEther("1000").toString()
        const realTotalSupply = await susutoken.totalSupply()

        assert.equal(realTotalSupply, expectedTotalSupply)
    })

    it("Default balance should set to owner", async function () {
        const expectedBalance = ethers.utils.parseEther("1000").toString()
        const signers = await ethers.getSigners()
        const owner = await signers[0].getAddress()
        const realBalance = await susutoken.balanceOf(owner)

        assert.equal(realBalance, expectedBalance)
    })


})