// scripts/deploy.js
const { ethers } = require("hardhat");

async function main() {
    // Pegue o primeiro endereço configurado na lista de contas
    const [deployer] = await ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);

    // Deploy do Token
    const CarbonCreditToken = await ethers.getContractFactory("CarbonCreditToken");
    const token = await CarbonCreditToken.deploy(1000000); // Suprimento inicial de 1.000.000 tokens
    console.log("Token deployed to:", token.address);

    // Deploy do Oracle
    const MockOracle = await ethers.getContractFactory("MockOracle");
    const oracle = await MockOracle.deploy();
    console.log("Oracle deployed to:", oracle.address);

    // Deploy do Registry
    const CarbonCreditRegistry = await ethers.getContractFactory("CarbonCreditRegistry");
    const registry = await CarbonCreditRegistry.deploy(oracle.address); // Endereço do Oracle passado ao construtor
    console.log("Registry deployed to:", registry.address);
}

main().catch((error) => {
    console.error("Error during deployment:", error);
    process.exitCode = 1;
});
