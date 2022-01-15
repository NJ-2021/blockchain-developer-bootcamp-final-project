import "./App.css";
import { useState, useEffect } from "react";
import { ethers } from "ethers";

import MetaCoin from "./contracts/Vision.json";

const Metacoionddress = "0x20174993C5bC9d125707684a5d49032bD96c9Fc3";
function App() {
  // const [wager, setWager] = useState();
  const [maticAmount, setMaticAmount] = useState();
  const [visiAmount, setVisiAmount] = useState();
  const [exchangeAmount, setExchangeAmount] = useState();

  let contract;
  let provider;

  let signer;
  let address;
  useEffect(() => {
    getStarted();
  }, []);

  async function requestAccount() {
    // Function to connect with user's MetaMask wallet
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }

  async function getStarted() {
    if (typeof window.ethereum !== "undefined") {
      const account = await requestAccount(); // Request MetaMask account
      provider = new ethers.providers.Web3Provider(window.ethereum);
      signer = provider.getSigner(); // Get the signer
      address = await signer.getAddress();
      console.log("Account:", await signer.getAddress());
      contract = new ethers.Contract(Metacoionddress, MetaCoin.abi); // Call the contract and pass in the smart contract address, abi & signer
      let balance = await provider.getBalance(address);
      console.log(balance);
      setMaticAmount(ethers.utils.formatEther(balance).slice(0,6)) 
      
      // let updatedWager = ethers.utils.parseEther(wager.toString()); // Convert wager state variable to ethers.js format
      // const tx = await contract.newCoinToss({ value: updatedWager }); // Call the contract function and pass in the wager
    }
  }

  async function doTransaction() {
    const tx = await contract.exchange(exchangeAmount);
    // const tx = await contract.newCoinToss({ value: updatedWager }); // Call the contract function and pass in the wager
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ether Coin Toss</h1>
        <h4>Hello This is your value {maticAmount}</h4>
        <p>
          !! Please note this uses the Rinkeby test network. Using any other
          network will result in lost funds. !!
        </p>
        <button value={exchangeAmount} onClick={doTransaction}>
          Start the coin toss!
        </button>
        <input
          onChange={(e) => setExchangeAmount(e.target.value)}
          placeholder="Send your ETH"
        />
      </header>
    </div>
  );
}
export default App;
