// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";

using SafeMath for uint256;

contract SwapPair {
    address private token1;
    address private token2;

    string public name;
    uint256 public totalLiquidity;
    mapping(address => uint256) public liquidityOf;

    constructor(string memory _name, address _token1, address _token2) {
        require(_token1 != _token2, "Tokens are the same.");

        (token1, token2) = _token1 < _token2 ? (_token1, _token2) : (_token2, _token1);
        require(token1 != address(0), "Null(0) Address.");

        name = _name;
    }
}