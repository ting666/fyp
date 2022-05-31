// SPDX-License_Identifier: UNLICENSED
pragma solidity >=0.4.22 <0.9.0;

contract Rental {

    uint public price;
    // uint public deposit;

    address payable public owner;
    address payable public renter;

    enum State { NOT_INITIATED, STARTED, RENTING, COMPLETE }
    State public currentState;

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
    constructor(address payable _owner, address payable _renter, uint _price) {
        owner = _owner;
        renter = _renter;
        price = _price * (1 ether);
        // deposit = _deposit;
    }

    //Where renter click on confirm checkout bttn, initiate contract
    function confirmPayment() onlyRenter payable public {
        require(currentState == State.NOT_INITIATED, "Contract already started!");
        require(msg.value == price, "Wrong amount!");
        // require(msg.value == deposit, "Wrong deposit amount!");
        // owner.transfer(deposit);
        // owner.transfer(price);
        currentState = State.STARTED;
    }

    //Where renter click on confirm receive item in good condition
    function confirmReceived() onlyRenter public {
        // require(currentCondition == Condition.GOOD, "Item Received are not in good condition!");
        require(currentState == State.STARTED, "Contract does not initiated!");
        currentState = State.RENTING;
    }

    //Where owner click on item is return
    function itemReturned() onlyOwner payable public {
        // require(currentCondition == Condition.GOOD, "Item Received are not in good condition!");
        require(currentState == State.RENTING, "Contract are not in RENTING state!");
        currentState = State.COMPLETE;
        owner.transfer(price);
        // owner.transfer(address(this).balance);
    }

    //Where renter abort contract due to item not in good condition/do not receive item
    function abort() onlyRenter payable public {
        require(currentState == State.STARTED, "Contract does not initiated!");
        currentState = State.COMPLETE;
        renter.transfer(address(this).balance);
    }
    
}