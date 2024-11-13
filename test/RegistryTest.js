const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("CarbonCreditRegistry Contract", function () {
    let CarbonCreditRegistry, registry;
    let owner, addr1;

    beforeEach(async function () {
        [owner, addr1] = await ethers.getSigners();
        CarbonCreditRegistry = await ethers.getContractFactory("CarbonCreditRegistry");
        registry = await CarbonCreditRegistry.deploy();
    });

    it("Deve permitir registrar créditos de carbono no registro", async function () {
        await registry.registerCredit(1, 100, owner.address);
        const credit = await registry.credits(1);
        console.log("Crédito registrado:", credit);

        expect(credit.owner).to.equal(owner.address);
        expect(credit.amount).to.equal(100);
        expect(credit.isUsed).to.equal(false);
    });

    it("Deve permitir a transferência de um crédito para outra conta", async function () {
        await registry.registerCredit(1, 100, owner.address);
        await registry.transferCredit(1, addr1.address);

        const credit = await registry.credits(1);
        console.log("Crédito transferido para outra conta:", credit);
        expect(credit.owner).to.equal(addr1.address);
    });
});
