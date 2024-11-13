// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

contract MockOracle {
    function validateCredit(uint256 id) external pure returns (bool) {
        // Implementar uma validação fictícia
        return id % 2 == 0; // Exemplo: valida IDs pares
    }
}
