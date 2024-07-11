const { web3, fs, privateKey, account } = require("./Helpers");

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
    maxPriorityFeePerGas: web3.utils.toWei("2", "gwei"), // Adjust value as needed
    maxFeePerGas: web3.utils.toWei("10", "gwei"), // Adjust value as needed
  };

  const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);
  const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
  console.log("Contract deployed at address:", receipt.contractAddress);
};

deploy();
