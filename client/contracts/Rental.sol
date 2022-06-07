// SPDX-License-Identifier: MIT
pragma solidity 0.8.14;

contract Rental {

    address payable public owner;
    address payable public renter;

    uint public item_price;
    uint public deposit;

    enum State { DEPOSIT_PAID, STARTED, RENTING, COMPLETE }
    State public currentState;

    // EVENTS


    // MODIFIERS
    modifier onlyRenter() {
        require(msg.sender == renter, "Only Renter can call this method!");
        _;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only Owner can call this method!");
        _;
    }

    // FUNCTIONS
    constructor(address payable _owner, uint _price, uint _deposit) payable {
        owner = _owner;
        renter = payable (msg.sender);
        item_price = _price * (1 ether);
        deposit = _deposit * (1 ether);
        // require(msg.value == deposit, "Wrong deposit amount!");
    }

    //Where renter click on confirm checkout bttn, initiate contract
    function confirmPayment() onlyRenter payable public {
        require(currentState == State.DEPOSIT_PAID, "Contract already started!");
        require(msg.value == item_price, "Wrong amount!");
        // owner.transfer(deposit);
        // owner.transfer(price);
        currentState = State.STARTED;
    }

    //Where renter click on confirm receive item in good condition
    function confirmReceived() onlyRenter public {
        require(currentState == State.STARTED, "Contract does not initiated!");
        currentState = State.RENTING;
    }

    //Where owner click on item is return
    function itemReturned() onlyOwner payable public {
        require(currentState == State.RENTING, "Contract are not in RENTING state!");
        currentState = State.COMPLETE;
        owner.transfer(item_price);
        renter.transfer(address(this).balance);
    }

    //Where renter abort contract due to item not in good condition/do not receive item
    function abortContract() onlyRenter payable public {
        require(currentState == State.STARTED, "Contract does not initiated!"); 
        currentState = State.COMPLETE;
        renter.transfer(address(this).balance);
    }
    
    //Get current connected wallet address
    function getWalletAddress() public view returns (address) {
        return renter;
    }

    //Get current contract status (DEPOSIT_PAID, STARTED, RENTING, COMPLETE)
    function getCurrentContractStatus() external view returns (string memory) {
        State temp = currentState;
        if (temp == State.DEPOSIT_PAID) return "Deposit Paid";
        if (temp == State.STARTED) return "Started";
        if (temp == State.RENTING) return "Renting";
        if (temp == State.COMPLETE) return "Complete";
        return "";
    }

    //Get cotract transaction amount
    function getTransactionAmount() public {
        
    }
}