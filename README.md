# Meta Transactions

This is a simple example of a meta transaction. It is a way to send a transaction to a contract that will then send a transaction to another contract.

![WithYemo Logo](https://via.placeholder.com/200x60/000000/FFFFFF&text=With%20Yemo)

# Before running

- [ ] Replace the contract address in the `Config.js` file with the address of the contract you deployed.
- [ ] Replace the provider URL in the `Config.js` file with the URL of the node you are using.
- [ ] Replace the private key in the `Config.js` file with the private key of the account you are using.
- [ ] in `Relayer.js`, replace function name with the name of the function you want to call and the parameters.

# Usage

1. Run `npm install` to install the dependencies.
2. Run `npm run deploy` to deploy the contract.
3. Run `npm run relayer` to start the relayer.
4. Run `npm run sign` to sign the message.

# TODO

- [ ] Add a way to send a transaction to the contract from the relayer
- [ ] Add a way to send a transaction to the contract from the signer
