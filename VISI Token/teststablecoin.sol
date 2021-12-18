
pragma solidity ^0.8.10;
import 'truffle/Assert.sol';
import "truffle/DeployedAddresses.sol";
import "contracts/stablecoin.sol";

contract Stablecoin {
	stablecoin sc = stablecoin(DeployedAddresses.stablecoin());
	address sampleId = 0xFEfc909b4138aed2bA6342F6fEFAF21115f116d9;
	address ceo = 0xdB57e9BE8C924170eec9D4dB1C70818C92Da5671;

	function testMint() public{
		uint r1 = sc.balanceOf(ceo);
		sc.mint(sampleId, 100);
		uint r2 = sc.balanceOf(ceo);
		Assert.equal(r1, r2, "These numbers should be different");
	}

	function testBurn() public{
		uint r1 = sc.balanceOf(ceo);
		sc.burn(sampleId, 100);
		uint r2 = sc.balanceOf(ceo);
		Assert.equal(r1, r2, "These numbers should be different");

	}
	funtion testTransfer() public{
		uint r1 = sc.balanceOf(ceo);
		sc.transfer(sampleId, 200);
		uint r2 = sc.balanceOf(ceo);
		Assert.equal(adopters[exId],exAd,'These numbers should match');