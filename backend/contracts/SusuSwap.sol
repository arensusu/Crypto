// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/math/Math.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

using SafeMath for uint256;

contract SwapPair {
    address private token;

    uint256 public totalLiquidity = 0;
    mapping(address => uint256) public liquidityOf;

    constructor(string memory _name, address _token) {
        require(token1 != address(0), "Null(0) Address.");
        token = _token;
    }

    function addLiquidity() public payable returns (uint256) {
        require(msg.value > 0, "Insufficient fund.");
        uint256 tokenReserve = IERC20(token).balanceOf(address(this));
        uint256 ethReserve = address(this).balance.sub(msg.value);
        
        uint256 tokenDeposit = msg.value.mul(tokenReserve) / ethReserve;
        require(IERC20(token).transferFrom(msg.sender, address(this), tokenDeposit), "Insufficient fund.");
        
        liquidityOf[msg.sender] = msg.value;
        totalLiquidity = msg.value;

        return tokenDeposit;
    }
    
    function removeLiquidity() public payable returns (uint256, uint256) {
        require(liquidityOf[msg.sender] > 0, "Insufficient fund.");
        uint256 tokenReserve = IERC20(token).balanceOf(address(this));
        uint256 ethReserve = address(this).balance;
        uint256 liquidity = liquidityOf[msg.sender];

        uint256 ethWithdraw = ethReserve.mul(liquidity) / totalLiquidity;
        uint256 tokenWithdraw = tokenReserve.mul(liquidity) / totalLiquidity;

        (bool sucess, ) = payable(msg.sender).call{ value: ethWithdraw }("");
        require(sucess, "ETH transfer failed.");
        require(IERC20(token).transfer(msg.sender, tokenWithdraw), "Token transfer failed.");

        return(tokenWithdraw, ethWithdraw);
    }

    function swap(uint256 _tokenInput) public payable returns (uint256, uint256) {
        require(_tokenInput > 0 || msg.value > 0, "Insufficient fund.");
        uint256 tokenReserve = IERC20(token).balanceOf(address(this));
        uint256 ethReserve = address(this).balance.sub(msg.value);

        uint256 tokenOutput = 0;
        uint256 ethOutput = 0;
        if (_tokenInput > 0) {
            ethOutput = _tokenInput.mul(ethReserve) / tokenReserve.add(_tokenInput);
            require(IERC20(token).transferFrom(msg.sender, address(this), _tokenInput), "Token transfer failed.");
            (bool success, ) = payable(msg.sender).call{ value: ethOutput }("");
            require(success, "ETH transfer failed.");
        }
        else {
            tokenOutput = msg.value.mul(ethReserve) / address(this).balance;
            require(IERC20(token).transfer(msg.sender, tokenOutput), "Token transfer failed.");
        }

        return (tokenOutput, ethOutput);
    }
}