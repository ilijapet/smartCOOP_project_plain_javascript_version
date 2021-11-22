// SPDX-License-Identifier: MIT

/**
 * @title COOPToken
 * @author Ilija Petronijevic
 * @notice COOPToken smart contract is used as support to main SmartCOOP contract. It generates COOPTokens which are used as confirmation when producer
 * deposit his fruits to SmartCOOP warehouse. (And possbile in future develepment of this SC as base for voiting rights inside SmartCOOP.)
 * @dev First we deploy COOPToken then SmartCOOP. Ones we have deployment address of SmartCOOP we call mint function and pass SmartCOOP address to which
 * all intial supplay of COOPTokens are assigne. Primary EOA from which we initiate all deployment process we give Miner role (using OpenZeppelin
 * AccessControl) who then have rights to call mint function and to pass SmartCOOP address to which we assigne initial supplay of COOP Tokens. All this
 * process is defined and executed during deployment phase over scripts/deployCOOP.py file.
 */

pragma solidity 0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract COOPToken is ERC20, AccessControl {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    constructor() ERC20("COOP Token", "COOP") {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _setupRole(MINTER_ROLE, msg.sender);
    }

    modifier onlyRole() {
        require(hasRole(MINTER_ROLE, msg.sender));
        _;
    }

    function mint(address to, uint256 amount) public onlyRole returns (bool) {
        _mint(to, amount);
        return true;
    }
}
