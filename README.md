# Gatekeeper

Access control for DApps.

Gatekeeper provides token-based access control for web3 applications. This is enabled by rules
defined in a smart-contract. This example uses an ERC721 token with a single boolean state property providing proof of access rights. 

Gatekeeper was developed during [BlockathonDAO](https://blockathon.xyz/) March 2022.

## Stack

* Ethereum blockchain
* Node (v16 recommended)
* Typescript
* Ethers.js
* Hardhat
* OpenZeppelin
* React
* TailwindCSS


## Build and Run

Install node packages:

`yarn install`

Create a `.env` file in root of the repo with the following entries:

```
ALCHEMY_RINKEBY_URL=https://eth-rinkeby.alchemyapi.io/v2/<YOUR_API_KEY>
PRIVATE_KEY=...
COINMARKETCAP_API_KEY=...
```

Compile the contract:

`yarn sol:compile`

Start the application:

`yarn run dev`

Open [http://localhost:3000](http://localhost:3000) 

### Contract Tests

To run the [tests](test/TestSleepyKoala.ts) for the contract functions:

`yarn run sol:test`

### Deploying Your Own Contract

If you prefer to use your own instance of the SleepyKoala contract:

1. `yarn sol:compile`
2. `yarn sol:deploy:rinkeby`
3. Update `contractAddress` in [Minter.tsx](components/Minter.tsx) with the contract address returned in step 2.
4. Restart the application.

## Usage

The sample contract is deployed on the Rinkeby testnet. You will require a small amount of test ETH.

1. On the home page connect to your MetaMask wallet.
2. Click the **Mint KOL** button.
3. Confirm the transaction in the MetaMask wallet and wait for the minted NFT.
4. The new NFT does not have sufficient access privileges so click the **Invert NFT** button.
5. Confirm the transaction and wait for access to be granted.


**Note**: For ease of demonstration and testing the app requires a new token to be minted every time.
In a real-world scenario the newly minted KOL token will be automatically detected in the users wallet.


## Contract

[SleepyKoala](contracts/SleepyKoala.sol)

```
mint()

getTokenData()

invertTokenData()

setTokenData()
```
