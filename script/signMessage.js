const Web3 = require("web3");
const {
  YOUR_INFURA_PROJECT_ID,
  YOUR_ACCOUNT_ADDRESS,
  YOUR_PRIVATE_KEY,
} = require("./Config");

const web3 = new Web3(
  new Web3.providers.HttpProvider(
    `https://mainnet.infura.io/v3/${YOUR_INFURA_PROJECT_ID}`
  )
);

const userAddress = YOUR_ACCOUNT_ADDRESS;

async function signMetaTransaction(functionSignature) {
  const nonce = await web3.eth.getTransactionCount(userAddress);
  const metaTxHash = web3.utils.soliditySha3(
    { t: "uint256", v: nonce },
    { t: "address", v: userAddress },
    { t: "bytes", v: functionSignature }
  );

  const { r, s, v } = await web3.eth.accounts.sign(
    metaTxHash,
    YOUR_PRIVATE_KEY
  );
  return { r, s, v };
}

module.exports = { signMetaTransaction };
