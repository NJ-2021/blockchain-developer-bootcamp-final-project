import HDWalletProvider from '@truffle/hdwallet-provider';
import { readFileSync } from 'fs';
const mnemonic = readFileSync(".secret").toString().trim();

export const networks = {
  development: {
    host: "127.0.0.1",
    port: 8545,
    network_id: "*", // Any network (default: none)
  },
  matic: {
    provider: () => new HDWalletProvider(mnemonic, `https://rpc-mumbai.maticvigil.com`),
    network_id: 80001,
    gasPrice: 10000000000,
    confirmations: 2,
    timeoutBlocks: 200,
    skipDryRun: true
  },
};
export const mocha = {
  // timeout: 100000
};
export const compilers = {
  solc: {
    version: "0.8.11",
  }
};