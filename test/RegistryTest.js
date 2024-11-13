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
        
        const expectedValue = ethers.BigNumber.from("100");

        expect(credit.amount.eq(expectedValue)).to.be.true;
        expect(credit.owner).to.equal(owner.address);
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

        try {
            await registry.connect(addr2).markCreditAsUsed(4);
            expect.fail("A função deveria ter falhado, mas não falhou.");
        } catch (error) {
            expect(error.message).to.include("Not authorized");
        }
        
        const credit = await registry.credits(4);
        console.log("Tentativa de terceiro de marcar como usado falhou, crédito:", credit);
        expect(credit.isUsed).to.equal(false);
    });

    it("Deve impedir remarcar um crédito já usado", async function () {
        await registry.registerCredit(5, 100, owner.address);
        await registry.connect(owner).markCreditAsUsed(5);

        try {
            await registry.connect(owner).markCreditAsUsed(5);
            expect.fail("A função deveria ter falhado, mas não falhou.");
        } catch (error) {
            expect(error.message).to.include("Credit already used");
        }

        const credit = await registry.credits(5);
        console.log("Verificação de reutilização, crédito:", credit);
        expect(credit.isUsed).to.equal(true);
    });

    it("Deve registrar e transferir crédito", async function () {
        // Registrar um crédito para addr1
        const creditId = 1;
        const amount = 100;
        await registry.connect(owner).registerCredit(creditId, amount, addr1.address);

        // Verificar se o crédito está registrado corretamente
        let credit = await registry.credits(creditId);
        expect(credit.owner).to.equal(addr1.address);
        expect(credit.amount.eq(amount)).to.be.true;
        expect(credit.isUsed).to.equal(false);

        // Transferir o crédito de addr1 para addr2
        await registry.connect(addr1).transferCredit(creditId, addr2.address);

        // Verificar se a transferência foi bem-sucedida
        credit = await registry.credits(creditId);
        expect(credit.owner).to.equal(addr2.address);
    });

    it("Deve previnir transferência não autorizada", async function () {
        // Registrar um crédito para addr1
        const creditId = 2;
        const amount = 50;
        await registry.connect(owner).registerCredit(creditId, amount, addr1.address);

        try {
            // Tentar transferência de addr2 (não autorizado)
            await registry.connect(addr2).transferCredit(creditId, owner.address);
            expect.fail("A função deveria ter falhado, mas não falhou.");
        } catch (error) {
            expect(error.message).to.include("Not the owner");
        }
    });
});
