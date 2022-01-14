import "./App.css";
import { useState, useEffect } from "react";
import { ethers } from "ethers";

import MetaCoin from "./contracts/Vision.json";

const MetaCoinAddress = "0x20174993C5bC9d125707684a5d49032bD96c9Fc3";
function App() {
  // const [wager, setWager] = useState();
  const [tokenNumber, setTokenNumber] = useState();

  let contract;
  let provider;

  let signer;

  useEffect(() => {
    getStarted();
  }, []);

  async function requestAccount() {
    // Function to connect with user's MetaMask wallet
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }

  async function getStarted() {
    if (typeof window.ethereum !== "undefined") {
      await requestAccount(); // Request MetaMask account
      provider = new ethers.providers.Web3Provider(window.ethereum);
      signer = provider.getSigner(); // Get the signer
      contract = new ethers.Contract(MetaCoinAddress, MetaCoin.abi); // Call the contract and pass in the smart contract address, abi & signer
      // let updatedWager = ethers.utils.parseEther(wager.toString()); // Convert wager state variable to ethers.js format
      // const tx = await contract.newCoinToss({ value: updatedWager }); // Call the contract function and pass in the wager
    }
  }

  async function doTransaction() {
    const tx = await contract.transact();
    // const tx = await contract.newCoinToss({ value: updatedWager }); // Call the contract function and pass in the wager
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ether Coin Toss</h1>
        <h4>Hello This is your value {tokenNumber}</h4>
        <p>
          !! Please note this uses the Rinkeby test network. Using any other
          network will result in lost funds. !!
        </p>
        <button value={tokenNumber} onClick={doTransaction}>
          Start the coin toss!
        </button>
        <input
          onChange={(e) => setTokenNumber(e.target.value)}
          placeholder="Send your ETH"
        />
      </header>
    </div>
  );
}
export default App;
