const { web3, fs, privateKey, account } = require("./Helpers");
const { CONTRACT_ADDRESS } = require("./Config");

const { signMetaTransaction } = require("./signMessage");

const Tx = require("ethereumjs-tx").Transaction;

const userAddress = account;
const contractAddress = CONTRACT_ADDRESS;

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

  tx.sign(privateKey);

  const serializedTx = tx.serialize();
  web3.eth
    .sendSignedTransaction("0x" + serializedTx.toString("hex"))
    .on("receipt", console.log)
    .on("error", console.error);
}

sendTransaction();
