// TODO: Replace with your Infura project ID, account address, and private key

const YOUR_ACCOUNT_ADDRESS = "0xc9BfaCDEAbc909A3bA6Fc92ac88e5A5C81dA5842";
const YOUR_PRIVATE_KEY =
  "0x6a7e4a6e32c8de8e4684ed3e3088a9439deab4d22e983e00e1774887e1a15815";
// TODO: Replace with the contract address from the deployment script after calling the deploy script
const CONTRACT_ADDRESS = "0x83b8e2a4ccbc92bf0a627fc41f26c90a570402ba";

// For infura
const YOUR_INFURA_PROJECT_ID = "YOUR_INFURA_PROJECT_ID";
//const PROVIDER_URL = `https://mainnet.infura.io/v3/${YOUR_INFURA_PROJECT_ID}`;

// For any other node
const PROVIDER_URL =
  "https://rpc.tenderly.co/fork/bf713b88-9251-4057-b8cf-14121642ea2f";

module.exports = {
  PROVIDER_URL,
  YOUR_ACCOUNT_ADDRESS,
  YOUR_PRIVATE_KEY,
  CONTRACT_ADDRESS,
};
