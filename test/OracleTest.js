const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MockOracle Contract", function () {
    let MockOracle, oracle;

    beforeEach(async function () {
        MockOracle = await ethers.getContractFactory("MockOracle");
        oracle = await MockOracle.deploy(); // Removido oracle.deployed()
    });

    it("Deve validar créditos usando o oráculo simulado", async function () {
        const isValid = await oracle.validateCredit(2);
        const isInvalid = await oracle.validateCredit(3);

        console.log("Validação para crédito ID 2 (deve ser válida):", isValid);
        console.log("Validação para crédito ID 3 (deve ser inválida):", isInvalid);

        expect(isValid).to.equal(true);
        expect(isInvalid).to.equal(false);
    });
});
