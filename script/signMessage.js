const { web3, privateKey } = require("./Helpers");

async function signMetaTransaction(functionSignature) {
  const nonce = await web3.eth.getTransactionCount(userAddress);
  const metaTxHash = web3.utils.soliditySha3(
    { t: "uint256", v: nonce },
    { t: "address", v: userAddress },
    { t: "bytes", v: functionSignature }
  );

  const { r, s, v } = await web3.eth.accounts.sign(metaTxHash, privateKey);
  return { r, s, v };
}

module.exports = { signMetaTransaction };
