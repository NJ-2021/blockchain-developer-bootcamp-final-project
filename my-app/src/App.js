import "./App.css";
import { useState, useEffect } from "react";
import { ethers } from "ethers";

import VisiToken from "./contracts/Vision.json";

const visiTokenAddress = "0x5d5961a9D299ca0801133f19488510308935668c";
function App() {
  const [maticAmount, setMaticAmount] = useState();
  const [visiAmount, setVisiAmount] = useState();
  const [visiAmountToSent, setVisiAmountToSend] = useState();
  const [exchangeAmount, setExchangeAmount] = useState();
  const [addressTo, setAddressTo] = useState();

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
      setMaticAmount(ethers.utils.formatEther(balance).slice(0, 6));

      await contract.balanceOf(address).then((balance) => {
        setVisiAmount(balance);
      });
      // let updatedWager = ethers.utils.parseEther(wager.toString()); // Convert wager state variable to ethers.js format
      // const tx = await contract.newCoinToss({ value: updatedWager }); // Call the contract function and pass in the wager
    }
  }

  async function sendEthToContract() {
    await contract
      .transfer(visiTokenAddress, ethers.utils.formatEther(exchangeAmount))
      .then((result) => console.log("success", result))
      .catch((err) => {
        console.log("Failed with error: " + err);
      });
    await contract
      .transfer(address, exchangeAmount)
      .then((result) => console.log("success", result))
      .catch((err) => {
        console.log("Failed with error: " + err);
      });
  }

  async function sendVisiToAccount() {
    const tx = await contract
      .transferFrom(
        address,
        addressTo,
        ethers.utils.formatEther(visiAmountToSent)
      )
      .then((result) => console.log("success", result))
      .catch((err) => {
        console.log("Failed with error: " + err);
      });
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>VISI Token</h1>
        <h4>Hello This is your Matic balance {maticAmount}</h4>
        <p>
          !! Please note this uses the Matic test network. Using any other
          network will result in lost funds. !!
        </p>
        <button onClick={sendEthToContract}>Get Visi</button>

        <input
          onChange={(e) => setExchangeAmount(e.target.value)}
          placeholder="Send your Matic"
        />

        <br />
        <br />
        <br />
        <h4>Hello This is your Visi balance {visiAmount || 0}</h4>
        <p>
          !! Please note this uses the Matic test network. Using any other
          network will result in lost funds. !!
        </p>
        <button onClick={sendVisiToAccount}>Sent Visi</button>

        <input
          onChange={(e) => setAddressTo(e.target.value)}
          placeholder="Address you want to sent Visi Too"
        />
        <input
          onChange={(e) => setVisiAmountToSend(e.target.value)}
          placeholder="Amount of Visi"
        />
      </header>
    </div>
  );
}
export default App;

