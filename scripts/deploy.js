async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

    const CarbonCreditToken = await ethers.getContractFactory("CarbonCreditToken");
    const token = await CarbonCreditToken.deploy(1000000); // Suprimento inicial

    const MockOracle = await ethers.getContractFactory("MockOracle");
    const oracle = await MockOracle.deploy();

    const CarbonCreditRegistry = await ethers.getContractFactory("CarbonCreditRegistry");
    const registry = await CarbonCreditRegistry.deploy(oracle);

    console.log("Token deployed to:", token.address);
    console.log("Registry deployed to:", registry.address);
    console.log("Oracle deployed to:", oracle.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
