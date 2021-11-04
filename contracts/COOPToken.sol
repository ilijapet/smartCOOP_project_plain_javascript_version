// contracts/COOPToken.sol
// SPDX-License-Identifier: MIT
pragma solidity 0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract COOPToken is ERC20 {
    constructor(uint256 initial_supplay) ERC20("COOP Token", "COOP") {
        _mint(msg.sender, initial_supplay);
    }
}