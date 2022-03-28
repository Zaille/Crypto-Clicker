// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

// import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract Profiles {

    struct Profile {
        uint256 amount;
        uint256 earnClick;
        bool exists;
    }

    mapping (address => Profile) public profileMap;

    event NewProfile(Profile profile);

    function createProfile() external {
        require(!checkProfile(), "The user has already a profile.");
        Profile memory profile = Profile(0, 1, true);
        profileMap[msg.sender] = profile;
        emit NewProfile(profile);
    }

    function addAmount(uint256 _amount) external {
        require(checkProfile(), "The user doesn't exist.");
        profileMap[msg.sender].amount += _amount;
        emit NewProfile(profileMap[msg.sender]);
    }

    function checkProfile() public view returns(bool){
        return profileMap[msg.sender].exists;
    }

}
