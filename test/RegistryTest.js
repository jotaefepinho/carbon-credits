const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("CarbonCreditRegistry Contract", function () {
    let CarbonCreditRegistry, registry;
    let owner, oracle, addr1, addr2;

    beforeEach(async function () {
        [owner, oracle, addr1, addr2] = await ethers.getSigners();
        CarbonCreditRegistry = await ethers.getContractFactory("CarbonCreditRegistry");
        registry = await CarbonCreditRegistry.deploy(oracle.address);
    });

    it("Deve registrar um crédito de carbono corretamente", async function () {
        await registry.registerCredit(1, 100, owner.address);
        const credit = await registry.credits(1);
        console.log("Crédito registrado:", credit);

        expect(credit.owner).to.equal(owner.address);
        expect(credit.amount).to.equal(100);
        expect(credit.isUsed).to.equal(false);
    });

    it("Deve permitir que o proprietário marque o crédito como usado", async function () {
        await registry.registerCredit(2, 100, owner.address);
        await registry.connect(owner).markCreditAsUsed(2);

        const credit = await registry.credits(2);
        console.log("Crédito marcado como usado pelo proprietário:", credit);
        expect(credit.isUsed).to.equal(true);
    });

    it("Deve permitir que o oráculo marque o crédito como usado", async function () {
        await registry.registerCredit(3, 100, owner.address);
        await registry.connect(oracle).markCreditAsUsed(3);

        const credit = await registry.credits(3);
        console.log("Crédito marcado como usado pelo oráculo:", credit);
        expect(credit.isUsed).to.equal(true);
    });

    it("Deve impedir que terceiros marquem o crédito como usado", async function () {
        await registry.registerCredit(4, 100, owner.address);

        await expect(
            registry.connect(addr1).markCreditAsUsed(4)
        ).to.be.revertedWith("Not authorized");
        
        const credit = await registry.credits(4);
        console.log("Tentativa de terceiro de marcar como usado falhou, crédito:", credit);
        expect(credit.isUsed).to.equal(false);
    });

    it("Deve impedir remarcar um crédito já usado", async function () {
        await registry.registerCredit(5, 100, owner.address);
        await registry.connect(owner).markCreditAsUsed(5);

        await expect(
            registry.connect(owner).markCreditAsUsed(5)
        ).to.be.revertedWith("Credit already used");

        const credit = await registry.credits(5);
        console.log("Verificação de reutilização, crédito:", credit);
        expect(credit.isUsed).to.equal(true);
    });
});
