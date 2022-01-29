# Blockchain-developer-bootcamp-final-project
# Decentralized Financial Management dApp
**PLEARN**

**PLAY.LEARN.EARN**

---

Deployed Dapp url:https://nj-2021.github.io/-blockchain-developer-bootcamp-final-project/

Video Walkthrough:https://youtu.be/HIZROqdTFds

**Public ETH Address for certification**: 0x094c05b850ECc3912934c8FDCa9243865F309b95

---
**About**

PLEARN is a very basic dApp that is designed to demonstrate learnings in the Consensys Academy Blockchain Developer Bootcamp.

PLEARN allows anyone with a MetaMask wallet to invest and make passive income through playing. **VISI**,the stableCoin, is a part of a three- model token and was deployed on Mumbai (Polygon Testnet) Network. The stablecoin will be usedin the game for borrowing.

This project was built using:

Truffle

Web3

React

OpenZeppelin

---
**For V1**:
Players will be using the Stable coin for borrowing: 
  **1- VISUALIZE (VISI) - stable coin:** 
  paying interest for staking.And in later stages will be used as a borrow token, in case players would like to leverage and buy more assets.

 ---
## Prerequisites

Node.js >= v14

Truffle, Ganache and Metamask

Npm

---
## Directory Structure  
1. contracts - contain solidity contracts 
2. migrations - contain Truffle's migration scripts
3. node_modules - created when `npm install` is run
4. test - contains mocha/chai tests for solidity contracts
5. PLEARN - contains all of the front-end UI, created running npx create-react-app 
    1. build - contains optimized code used by Netlify
    2. node_modules
    3. public - contains UI files 
    4. src - contains the front end source code

---
## Dependencies

1. `npm install -g truffle`
2. `npm install -g @truffle/hdwallet-provider`
3. `npm install -g web3`
4. `npm install -g @openzeppelin/contracts`
5. `npm install -g ganache-cli`

---
**User Interaction flow:**

1. Connect MetaMask to dApp
2. Register as a  new player


---
## Running the Project
1. Start a local Ganache blockchain using either the Ganache GUI or CLI `ganache-cli` . If using CLI, open a second terminal window.
2. Run `truffle compile`
3. Run `truffle migrate` or `truffle migrate --reset` to overwrite any existing.contract instance.
4. Connect MetaMask to Ganache. Steps can be found here https://www.trufflesuite.com/docs/truffle/getting-started/truffle-with-metamask
5. In the terminal, navigate to the `PLEARN` directory and run `nmp run start` to spin up the server for the front end.

## Testing the Solution 
To test, simply make sure your local Ganache network is running and that your  `truffle-config.js` network configuration is set to the correct port. Either 7545 or 8545 depending on how started Ganache.

Then run `truffle test`

---
**Features to be done:**

**For V2**:

  **1- MANIFESTATION (MANI):** 
  Obtained by voting- governance, and suggestions!
  
  _Suggestions: For each suggestion a player makes to improve the game, s/he will be getting a reward in case his suggestion won. So, in this case the game will improve by its       users' suggestions and they will be rewarded for their own suggestions_
  
 **2- AMBITION (AMBI):**
 The utility token that is going to be used for playing, buying and selling assets.
  
  
