import "./App.css";
import { useState, useEffect } from "react";
import { ethers } from "ethers";

import VisiToken from "./contracts/Vision.json";

const visiTokenAddress = "0x5d5961a9D299ca0801133f19488510308935668c";
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
      contract = new ethers.Contract(visiTokenAddress, VisiToken.abi); // Call the contract and pass in the smart contract address, abi & signer
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
        <h1>VISI Token</h1>
        <h4>Hello This is your Vision balance {maticAmount}</h4>
        <p>
          !! Please note this uses the Matic test network. Using any other
          network will result in lost funds. !!
        </p>
        <input
          onChange={(e) => setExchangeAmount(e.target.value)}
          placeholder="Send your ETH"
        />

      </header>
  </div>
  );
}
export default App;
