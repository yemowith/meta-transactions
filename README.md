# Meta-Transaction Project

This project demonstrates a meta-transaction setup using Solidity and Node.js.

## Project Structure

meta-transaction/
├── build/
│ ├── MetaTransaction.abi
│ └── MetaTransaction.bin
├── script/
│ ├── Config.js
│ ├── Deploy.js
│ ├── Relayer.js
│ └── signMessage.js
└── README.md

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Replace placeholder values in `script/Config.js` with your actual Infura project ID, account address, and private key.

## Deploy Contract

To deploy the contract, run:

```bash
node script/Deploy.js
```

### Çalıştırma

1. Gerekli paketleri yükleyin:

   ```bash
   npm install
   ```

2. Kontratı deploy edin:

   ```bash
   node script/Deploy.js
   ```

3. `Relayer.js` scriptini çalıştırarak meta-transaction'ı gönderin:
   ```bash
   node script/Relayer.js
   ```

### Bir Sonraki Adım

**a.** Birim testler ekleyin ve kodun doğruluğunu kontrol edin.
**b.** İmzalama sürecini daha güvenli hale getirmek için kullanıcıdan imza alırken güvenliği arttıracak ek adımlar ekleyin.
