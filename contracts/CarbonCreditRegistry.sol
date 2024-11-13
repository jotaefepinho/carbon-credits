// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CarbonCreditRegistry {
    struct Credit {
        address owner;
        uint256 amount;
        bool isUsed;
    }

    mapping(uint256 => Credit) public credits;
    address public mockOracle;

    constructor(address _mockOracle) {
        mockOracle = _mockOracle;
    }

    modifier onlyOwnerOrOracle(uint256 id) {
        require(
            msg.sender == credits[id].owner || msg.sender == mockOracle,
            "Not authorized"
        );
        _;
    }

    function registerCredit(uint256 id, uint256 amount, address owner) public {
        credits[id] = Credit(owner, amount, false);
    }

    function transferCredit(uint256 id, address to) public {
        require(!credits[id].isUsed, "Credit already used");
        require(credits[id].owner == msg.sender, "Not the owner");

        credits[id].owner = to;
    }

    function markCreditAsUsed(uint256 id) public onlyOwnerOrOracle(id) {
        require(!credits[id].isUsed, "Credit already used");
        credits[id].isUsed = true;
    }
}
