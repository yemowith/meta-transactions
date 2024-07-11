const {
  YOUR_INFURA_PROJECT_ID,
  YOUR_ACCOUNT_ADDRESS,
  YOUR_PRIVATE_KEY,
} = require("./Config");
const { signMetaTransaction } = require("./signMessage");

const Web3 = require("web3");
const Tx = require("ethereumjs-tx").Transaction;

const web3 = new Web3(
  new Web3.providers.HttpProvider(
    `https://mainnet.infura.io/v3/${YOUR_INFURA_PROJECT_ID}`
  )
);

const relayerPrivateKey = Buffer.from(YOUR_PRIVATE_KEY, "hex");
const userAddress = YOUR_ACCOUNT_ADDRESS;

const contractAddress = "CONTRACT_ADDRESS";
const functionSignature = web3.eth.abi.encodeFunctionCall(
  {
    name: "yourFunction",
    type: "function",
    inputs: [
      {
        type: "uint256",
        name: "param",
      },
    ],
  },
  ["42"]
);

async function sendTransaction() {
  const {
    r: sigR,
    s: sigS,
    v: sigV,
  } = await signMetaTransaction(functionSignature);
  const nonce = await web3.eth.getTransactionCount(userAddress);

  const txData = web3.eth.abi.encodeFunctionCall(
    {
      name: "executeMetaTransaction",
      type: "function",
      inputs: [
        {
          type: "address",
          name: "userAddress",
        },
        {
          type: "bytes",
          name: "functionSignature",
        },
        {
          type: "bytes32",
          name: "sigR",
        },
        {
          type: "bytes32",
          name: "sigS",
        },
        {
          type: "uint8",
          name: "sigV",
        },
      ],
    },
    [userAddress, functionSignature, sigR, sigS, sigV]
  );

  const tx = new Tx({
    nonce: nonce,
    gasPrice: web3.utils.toHex(web3.utils.toWei("10", "gwei")),
    gasLimit: web3.utils.toHex(100000),
    to: contractAddress,
    value: 0,
    data: txData,
  });

  tx.sign(relayerPrivateKey);

  const serializedTx = tx.serialize();
  web3.eth
    .sendSignedTransaction("0x" + serializedTx.toString("hex"))
    .on("receipt", console.log)
    .on("error", console.error);
}

sendTransaction();
