wip.

# solidity-compile-deploy
#### :Minimal JS compile/deploy harness for solidity contracts


____

### Install
*Requires babel cli to be installed globally*
1. `npm i babel-cli -g`
2. `git clone https://github.com/seanaver/solidity-compile-deploy`
3. `cd solidity-compile-deploy && npm i`

#### Setup
1. Make a folder to hold you contracts `mkdir contracts`
2. Add your `.sol` files into the contract folder container
3. `touch deploy.config.js` into the root of your project

```
{
  network: [string], (main, ropsten, rinkeby)
  contracts: [array], (ERC20.sol, ...)
}
```

#### Run
1. `npm run compile [contract_dir_name]`
2. `npm run create-wallet`
~~3. `npm run deploy`~~


*WARNING: Private key saved to local json file wallet.json
Do not push file to github or share in anyway if dealing with main-net eth*
