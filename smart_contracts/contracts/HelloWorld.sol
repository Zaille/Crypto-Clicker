pragma solidity ^0.8.0;

contract HelloWorld {

    string public sentence;

    constructor() public {
        sentence = "HelloWorld !";
    }

    function saySomething() public view returns(string memory){
        return (sentence);
    }

}
