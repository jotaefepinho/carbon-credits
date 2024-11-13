const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("CarbonCreditToken Contract", function () {
    let CarbonCreditToken, token;
    let owner;

    beforeEach(async function () {
        [owner] = await ethers.getSigners();
        CarbonCreditToken = await ethers.getContractFactory("CarbonCreditToken");
        token = await CarbonCreditToken.deploy(1000000); // Removido token.deployed()
    });

    it("Deve criar o suprimento inicial de tokens para o proprietário", async function () {
        const balance = await token.balanceOf(owner.address);
        console.log("Suprimento inicial criado, balance do proprietário:", balance.toString());
        expect(balance).to.equal(1000000);
    });
});
