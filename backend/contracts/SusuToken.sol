// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract SusuToken is ERC20 {

    address private immutable owner;

    constructor() ERC20("SusuToken", "SST") {
        _mint(msg.sender, 1e18 ether);
        owner = msg.sender;
    }

    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }

    function mint(uint256 _amount) external payable {
        require(msg.value * 1e9 == _amount);
        _mint(msg.sender, _amount);
    }

    function burn(uint256 _amount) external {
        require(balanceOf(msg.sender) >= _amount);
        _burn(msg.sender, _amount);
    }

    function withdraw() external onlyOwner {
        payable(msg.sender).transfer(address(this).balance);
    }
}