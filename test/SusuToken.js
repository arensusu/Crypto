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

    it("Decimals should be 9", async function () {
        const expectedDecimals = 9
        const realDeciamls = await susutoken.decimals()

        assert.equal(realDeciamls, expectedDecimals)
    })

    it("Total Supply should be 1 ether", async function () {
        const expectedTotalSupply = ethers.utils.parseEther("1").toString()
        const realTotalSupply = await susutoken.totalSupply()

        assert.equal(realTotalSupply, expectedTotalSupply)
    })

    it("Default balance should set to owner", async function () {
        const expectedBalance = ethers.utils.parseEther("1").toString()
        const signers = await ethers.getSigners()
        const owner = await signers[0].getAddress()
        const realBalance = await susutoken.balanceOf(owner)

        assert.equal(realBalance, expectedBalance)
    })

    it("Should transfer 0.1 ether to others", async function () {
        const expectedOwnerBalance = ethers.utils.parseEther("0.9").toString()
        const expectedOtherBalance = ethers.utils.parseEther("0.1").toString()

        const signers = await ethers.getSigners()
        const owner = await signers[0].getAddress()
        const other = await signers[1].getAddress()

        await susutoken.transfer(other, ethers.utils.parseEther("0.1"))

        const realOwnerBalance = await susutoken.balanceOf(owner)
        const realOtherBalance = await susutoken.balanceOf(other)

        assert.equal(realOwnerBalance, expectedOwnerBalance)
        assert.equal(realOtherBalance, expectedOtherBalance)
    })

    it("Should be reverted when transfer the invalid value", async function () {
        const to = await (await ethers.getSigners())[1].getAddress()
        await expect(susutoken.transfer(to, ethers.utils.parseEther("0"))).to.be.reverted
    })

    it("Should be reverted when approve the invalid value", async function () {
        const spender = await(await ethers.getSigners())[1].getAddress()
        await expect(susutoken.approve(spender, 0)).to.be.reverted
    })

    it("Should be reverted when approve to null address", async function () {
        await expect(susutoken.approve("0x0000000000000000000000000000000000000000", ethers.utils.parseEther("0.1"))).to.be.reverted
    })

    it("Should approve 0.1 ether to others", async function () {
        const owner = await(await ethers.getSigners())[0].getAddress()
        const spender = await(await ethers.getSigners())[1].getAddress()
        
        await susutoken.approve(spender, ethers.utils.parseEther("0.1"))

        assert.equal(await susutoken.allowance(owner, spender), ethers.utils.parseEther("0.1").toString())
    })

    it("Should be reverted when transfer from user with invalid value", async function () {
        const sender = await(await ethers.getSigners())[0].getAddress()
        const receiver = await(await ethers.getSigners())[1].getAddress()
        await expect(susutoken.transferFrom(sender, receiver, 0)).to.be.reverted
    })
    
    it("Should be reverted when transfer from user with invalid approval", async function () {
        const sender = await(await ethers.getSigners())[0].getAddress()
        const receiver = await(await ethers.getSigners())[1].getAddress()
        await expect(susutoken.transferFrom(sender, receiver, ethers.utils.parseEther("0.1"))).to.be.reverted
    })

    it("Should transfer 0.1 ether from sender to receiver", async function () {
        const sender = await(await ethers.getSigners())[1].getAddress()
        const receiver = await(await ethers.getSigners())[0].getAddress()
        await susutoken.approve(sender, ethers.utils.parseEther("0.1"))

        susutoken = susutoken.connect(await ethers.getSigner(sender))
        await susutoken.transferFrom(receiver, sender, ethers.utils.parseEther("0.1"))

        assert.equal(await susutoken.balanceOf(sender), ethers.utils.parseEther("0.1").toString())
    })

})