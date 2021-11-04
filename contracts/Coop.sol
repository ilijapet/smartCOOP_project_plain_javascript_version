// SPDX-License-Identifier: MIT
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/**
    @title SmartCOOP 
    @notice COOP token is based on the OpenZeppelin ERC-20 token standard as defined at
            https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC20
            
            Ownable is definied on following OpenZeppelin address ->
            https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/
 */



pragma solidity 0.8.0;


contract Coop is Ownable {
   
    /* State variables
     */

    ERC20 private coopToken;

    address public coopTokenContractAddress;  
        
    struct Cooperant {
        uint feePayed;
        uint kg;
    } 
    
    // promenio sam iz private u public zbog testa
    mapping (address => Cooperant) public cooperants;      
        
    constructor (address contractAddress) {
       coopTokenContractAddress = contractAddress;
       coopToken = ERC20(contractAddress);     
    } 

    /* Events 
     */

    event NewMember (address sender, uint amount);
    event DepositFruits (address cooperant, uint kilograms);
   
    modifier onlyMembers() {
        require (cooperants[msg.sender].feePayed != 0, "Please become SmartCOOP member");
        _;
    }

    modifier onlyNewMembers () {
        require(cooperants[msg.sender].feePayed == 0, "You already pay mebership fee");
        _;
    }

    /* Functions
     */ 
     
    fallback () external {
        revert();
    }

    // WIDROW FUNCTION
    function withdraw(uint _amount) public payable onlyOwner returns (bool) {
        // Da li ovde treba dva payable
        payable(owner()).transfer(_amount);
        // try out with this syntax
        // (bool sent, bytes memory data)  = owner().call{value:_amount}("");       
        // require(sent, "Failed to send Ether");
        return true;
    }
    
    // Uneo sam _amount a ova funkcija je bila bez argumenata
    function becomeCoopMember() public payable onlyNewMembers returns (bool) {        
        // promenio sam msg.vale u _amount
        cooperants[msg.sender].feePayed += msg.value; 
        // promenio sam msg.vale u _amount
        emit NewMember(msg.sender, msg.value); 
        return true;        
    }      

    function depositFruitsToCOOP(uint _kg) public onlyMembers returns (bool) {       
        cooperants[msg.sender].kg += _kg;
        coopTokenTransferTo(_kg*(10**18));  
        emit DepositFruits (msg.sender, _kg);
        return true;          
    }    
    
    function getUserAccountBalance(address _salje) public view returns (uint256, uint256, uint256) {
        return (cooperants[_salje].feePayed, cooperants[_salje].kg, coopToken.balanceOf(_salje)/(10**18));
    }
    
    function coopTokenTransferTo (uint _kg) private returns (bool) {        
        return coopToken.transfer(owner(), msg.sender, _kg);
    }      
    
    function coopTokenTransferFrom (uint _kg) private onlyMembers returns (bool) {        
        return coopToken.transfer(msg.sender, owner(), _kg);
    }      
}