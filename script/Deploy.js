const {
  PROVIDER_URL,
  YOUR_ACCOUNT_ADDRESS,
  YOUR_PRIVATE_KEY,
} = require("./Config");

const Web3 = require("web3");
const fs = require("fs");

const web3 = new Web3(new Web3.providers.HttpProvider(PROVIDER_URL));
const account = YOUR_ACCOUNT_ADDRESS;
const privateKey = Buffer.from(YOUR_PRIVATE_KEY, "hex");

const contractAbi = JSON.parse(fs.readFileSync("./build/MetaTransaction.abi"));
const contractBin = fs.readFileSync("./build/MetaTransaction.bin").toString();

const deploy = async () => {
  const contract = new web3.eth.Contract(contractAbi);
  const deployTx = contract.deploy({ data: "0x" + contractBin });

  const gas = await deployTx.estimateGas();
  const tx = {
    from: account,
    gas: gas,
    data: deployTx.encodeABI(),
  };

  const signedTx = await web3.eth.accounts.signTransaction(
    tx,
    privateKey.toString("hex")
  );
  const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
  console.log("Contract deployed at address:", receipt.contractAddress);
};

deploy();
