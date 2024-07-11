const {
  PROVIDER_URL,
  YOUR_ACCOUNT_ADDRESS,
  YOUR_PRIVATE_KEY,
} = require("./Config");

const { Web3 } = require("web3");
const web3 = new Web3(PROVIDER_URL);

const account = YOUR_ACCOUNT_ADDRESS;
const privateKey = YOUR_PRIVATE_KEY;

const fs = require("fs");

module.exports = {
  web3,
  fs,
  account,
  privateKey,
};
