const { ethers } = require("hardhat")
const { expect, assert } = require("chai")

describe("SusuToken", function() {

    let susutoken
    beforeEach(async function () {
        const susutokenFactory = await ethers.getContractFactory("SusuToken")
        susutoken = await susutokenFactory.deploy()
    })

    it("Should be named with SusuToken", async function () {
        const expectedName = "SusuToken"
        const realName = await susutoken.name()

        assert.equal(realName, expectedName)
    })
})