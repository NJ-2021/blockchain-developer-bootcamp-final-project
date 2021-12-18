pragma solidity ^0.5.0;
import 'truffle/Assert.sol';
import "truffle/DeployedAddresses.sol";
import ".\contracts\stablecoin.sol";

contract Stablecoin {
	stablecoin sc = stablecoin(DeployedAddresses.stablecoin());
	address sampleId = 0xc8dD220A082c4dF343d1691Bde458e9E37A011Bb;
	address ceo = 0x70fdAc39369d55464b410e2fCbbd4b78E002eD25;

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
	}
}