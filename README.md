# Blockchain-developer-bootcamp-final-project
# Decentralized Financial Management dApp
**PLEARN**

**PLAY.LEARN.EARN**

---

Links:

Video Walkthrough:

Public ETH Address:

---

**About**

PLEARN is a very basic dApp that is designed to demonstrate learnings in the Consensys Academy Blockchain Developer Bootcamp.

PLEARN allows anyone with a MetaMask wallet to invest and make passive income through playing.

This project was built using:

Truffle

Web3

React

OpenZeppelin

---

**Project Description:**

The Financial Managment dApp allows players to play in order to learn how to manage their fincances through making investments, buying assests, buying eral estate. The game could be played individually or in groups. Players need to pay off all their debts and expenses before moving to the next stage of the game and be able to reach their dream of being debt free and get their deam life.

**For V1**:
Players will be using the utility token: 
**AMBITION (AMBI)- Utility token**: - for playing and paying transaction fees.

 ---

## Directory Structure  
1. contracts - contains solidity contracts 
2. migrations - contains Truffle's migration scripts
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
3. Create a new game 
4. Profit or banckruptcy

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
2 other tokens will be added in the next stages:

  **1- VISUALIZE (VISI) - stable coin:** 
  paying interest for staking.And in later stages will be used as a borrow token, in case players would like to leverage and buy more assets.
  
  **2- MANIFESTATION (MANI):** 
  Obtained by voting- governance, and suggestions!
  
  _Suggestions: For each suggestion a player makes to improve the game, s/he will be getting a reward in case his suggestion won. So, in this case the game will improve by its       users' suggestions and they will be rewarded for their own suggestions_
