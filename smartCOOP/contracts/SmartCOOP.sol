// SPDX-License-Identifier: MIT

/**
 * @title SmartCOOP
 * @author Ilija Petronijevic
 * @notice Contract should be use only as proof of basic concept for smart contract usage in the field of agricultural cooperatives.
 */

pragma solidity 0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

contract SmartCOOP is Pausable, Ownable {
    ERC20 private coopToken;
    AggregatorV3Interface private priceFeed;

    uint256 private constant RASPBERRY_PRICE = 9;

    // State variables

    address[] public s_warehouseStock;

    struct Cooperant {
        uint256 feePayed;
        uint256 kg;
    }

    struct Bidder {
        uint256 totalPayed;
        uint256 kgBought;
    }

    mapping(address => Cooperant) public s_cooperants;
    mapping(address => Bidder) public s_bidders;

    /**
     *@dev We use COOPToken (ERC20 based OpenZeppelin implementation) address to instatiate this contract inside SmartCOOP and to call
     * transfer function from within depositFruitsToCoop function. Then we use chanilink Kovan test net address to instatiate interface which
     * will provide to us real time ETH/USD price feed.
     * IMPORTANT: if we deploy this contract localy get_contract and get_acount funcitons from scripts/helpful_scripts.py will notice that we
     * are deploying localy and instead of chainlink Kovan test net interface we will deploy mock to be used in context od local enviroment.
     * What means that there is no need for any additional intervention or configuration from side of developer. This contract will be fully
     * operational in Kovan testnet enviroment as well as in local ganache dev enviroment with Chainlink price feed.
     */
    constructor(address contractAddress, address chainlinkPrice) {
        coopToken = ERC20(contractAddress);
        priceFeed = AggregatorV3Interface(chainlinkPrice);
    }

    // Events

    event NewMember(address sender, uint256 amount);
    event DepositFruits(address cooperant, uint256 kilograms);
    event TransferMade(
        string messageToProducer,
        uint256 inEthProducer,
        string messageToCoop,
        uint256 inEthCoop
    );
    event NotEnoughGoods(string message);
    event ToContract(address sender, uint256 amount);
    event WithdrawConfirmation(address receiver, uint256 amount);
    event COOPTokenTransferConfirmation(address receiver, uint256 amount);

    // Modifiers

    ///@dev control that that function can be called only by SmartCOOP members (depositFruitsToCOOP function)
    modifier onlyMembers() {
        require(
            s_cooperants[msg.sender].feePayed != 0,
            "Please become SmartCOOP member"
        );
        _;
    }

    ///@dev Controling that function can be called only by EOA which is not already registered as SmartCOOP members (becomeCoopMember function)
    modifier onlyNewMembers() {
        require(
            s_cooperants[msg.sender].feePayed == 0,
            "You already pay mebership fee"
        );
        _;
    }

    ///@dev Controlling the fee paid when we call becomeCoopMember function is more then 1000 wei
    modifier minimumFee() {
        require(msg.value >= 1000, "Yearly fee is minimum 1000 wei");
        _;
    }

    // Functions

    /// @notice Allowing new EOA to become SmartCOOP member
    /// @return If execution was successful function will return true
    function becomeCoopMember()
        public
        payable
        whenNotPaused
        onlyNewMembers
        minimumFee
        returns (bool)
    {
        s_cooperants[msg.sender].feePayed += msg.value;
        emit NewMember(msg.sender, msg.value);
        return true;
    }

    /// @notice Allowing EOA which already pay SmartCOOP membership fee to deposit fruits to SmartCOOP warehouse
    /// @param _kg Passing number of kilograms producer would like to deploy to warehouse
    /// @return If execution was successful function will return true
    function depositFruitsToCOOP(uint256 _kg)
        public
        whenNotPaused
        onlyMembers
        returns (bool)
    {
        s_cooperants[msg.sender].kg += _kg;
        s_warehouseStock.push(msg.sender);
        coopTokenTransferTo(msg.sender, _kg * (10**18));
        emit DepositFruits(msg.sender, _kg);
        return true;
    }

    /**
     * @notice This function will allow any EOA that is not already member of cooperative to bid for fruits inside SmartCOOP warhouse.
     * @dev RASPBERRY_PRICE is hard coded because there is no out of the box chainlink date feed for raspberry price and alterantive solution includes using
     * HTTP GET request to external API using chainlink request&receive data cycle. What we consider to be a bit out of scope of this project and inital
     * ambition.
     * @param _amount uint256 for amount of fruits bidder would like to buy
     * @return If execution was successful function will return true
     */
    function bid(uint256 _amount) public payable whenNotPaused returns (bool) {
        for (
            uint256 warehouseStockIndex = 0;
            warehouseStockIndex < s_warehouseStock.length;
            warehouseStockIndex++
        ) {
            address inStockCooperantAddress = s_warehouseStock[
                warehouseStockIndex
            ];
            if (s_cooperants[inStockCooperantAddress].kg <= _amount) {
                uint256 totalPrice = s_cooperants[inStockCooperantAddress].kg *
                    RASPBERRY_PRICE;
                uint256 priceWeiProducer = (ethUSD(totalPrice) / 100) * 95;
                uint256 priceWeiCOOP = (ethUSD(totalPrice) / 100) * 5;

                (bool sentProducer, ) = inStockCooperantAddress.call{
                    value: priceWeiProducer
                }("");
                require(sentProducer, "Failed to send Ether");
                delete s_warehouseStock[warehouseStockIndex];
                _amount -= s_cooperants[inStockCooperantAddress].kg;
                s_bidders[msg.sender].totalPayed += totalPrice;
                s_bidders[msg.sender].kgBought += s_cooperants[
                    inStockCooperantAddress
                ].kg;
                s_cooperants[inStockCooperantAddress].kg = 0;
                emit TransferMade(
                    "To your account was transfered",
                    priceWeiProducer,
                    "And on COOP account",
                    priceWeiCOOP
                );
            } else if (s_cooperants[inStockCooperantAddress].kg >= _amount) {
                s_cooperants[inStockCooperantAddress].kg -= _amount;
                uint256 totalPrice = _amount * RASPBERRY_PRICE;
                uint256 priceWeiProducer = (ethUSD(totalPrice) / 100) * 95;
                uint256 priceWeiCOOP = (ethUSD(totalPrice) / 100) * 5;
                s_bidders[msg.sender].kgBought += _amount;
                s_bidders[msg.sender].totalPayed += totalPrice;

                (bool sentProducer, ) = inStockCooperantAddress.call{
                    value: priceWeiProducer
                }("");
                require(sentProducer, "Failed to send Ether");
                emit TransferMade(
                    "To your account was transfered",
                    priceWeiProducer,
                    "And on COOP account",
                    priceWeiCOOP
                );
            } else {
                emit NotEnoughGoods(
                    "There si no enough raspberries in warehouse"
                );
            }
        }
        return true;
    }

    /// @notice This function is used to transfer COOPTokens to producer account in equal amount to fruits he deposit to warehouse.
    /// @dev Used only inside depositFruitsToCOOP function.
    /// @param receiver Passing address to which COOPToken will be transferred.
    /// @param _kg Number of kilograms of fruits producer deploy to warehouse. Based on this argument he will receive equal amount of COOPTokens.
    /// @return If execution was successful function will return true.
    function coopTokenTransferTo(address receiver, uint256 _kg)
        private
        returns (bool)
    {
        emit COOPTokenTransferConfirmation(receiver, _kg);
        return coopToken.transfer(receiver, _kg);
    }

    /// @notice This function is used to withdraw eth from SmartCOOP account
    /// @dev By modifier onlyOwner we restrict right to call this function only to EOA who deploy both SmartCOOP and COOPToken
    /// @return If execution was successful function will return true
    function withdraw() public onlyOwner returns (bool) {
        uint256 coopBalance = address(this).balance;
        (bool sent, ) = owner().call{value: address(this).balance}("");
        emit WithdrawConfirmation(owner(), coopBalance);
        require(sent, "Failed to send Ether");
        return true;
    }

    /// @notice This function is used to provide overview of user SmartCOOP account
    /// @param _user We pass user address as argument
    /// @return If executed sucesfully function will return 3 values: 1) how much user pay SmartCOOP fee; 2) Total amount of kg user currenly have in
    /// SmartCOOP warehouse; 3) Total amount of COOPTokens he/she receive
    function getUserAccountBalance(address _user)
        public
        view
        returns (
            uint256,
            uint256,
            uint256
        )
    {
        return (
            s_cooperants[_user].feePayed,
            s_cooperants[_user].kg,
            coopToken.balanceOf(_user) / (10**18)
        );
    }

    /// @notice This function is used to provide overview of bidder SmartCOOP account
    /// @param _bidder We pass bidder address
    /// @return If executed successfully function will return 2 values: 1) total payed for all goods bidder bought; 2) Total amount of kg bidder bought
    // from SmartCOOP
    function getBidderAccountBalance(address _bidder)
        public
        view
        returns (uint256, uint256)
    {
        return (s_bidders[_bidder].totalPayed, s_bidders[_bidder].kgBought);
    }

    receive() external payable {
        emit ToContract(msg.sender, msg.value);
    }

    fallback() external {
        revert();
    }

    /// @dev This function is used to block usage of becomeCoopMember, depositFruitsToCOOP and bid functions in case of bugs or hacks. Pause function
    /// can be called only by EOA who deploy COOPTOkena and SmartCOOP and it is inherited from OpenZeppelin Pausable smart contract.
    function pause() public onlyOwner {
        _pause();
    }

    /// @dev This function is used to unpause usage of becomeCoopMember, deposit FruitsToCOOP and bid functions.
    function unpause() public onlyOwner {
        _unpause();
    }

    /** @notice This function is used to get ETH/USD price ration from Chainlink price data feed. This function is used to calculate how much bidder needs
     * to pay for fruits he bought from SmartCOOP and how much SmartCOOP should trnasfer to producer.
     * @dev In case we deploy contracts to local dev enviroment get_contract and get_acount fuctions from scripts/helpful_scripts.py will deploy mock
     * contract to be used in context of local dev. enviroment. In case we deploy to Kovan test net same function will deploy adequte contracts and use
     * proper account for this purpose.
     * @return This function returns price (int256 data type) provided by Chainlink price date feed
     */
    function getLatestPrice() public view returns (int256) {
        (, int256 price, , , ) = priceFeed.latestRoundData();
        return price;
    }

    /// @notice Used for calculating amount of wei from USD total
    /// @param _amount Price in USD which should be converetd to wei
    /// @return Amount of wei to be payed
    function ethUSD(uint256 _amount) public view returns (uint256) {
        uint256 denominator = uint256(getLatestPrice());
        uint256 ethInUsdAmount = ((_amount * 1000000000000000000000) /
            denominator) * 100000;
        return ethInUsdAmount;
    }
}
