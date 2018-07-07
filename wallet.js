import { Wallet } from 'ethers'
import { promises as fs } from 'fs'

const createWallet = async () => {
    const wallet = Wallet.createRandom()
    const account = {
        pk: wallet.privateKey,
        pa: wallet.address
    }
    await fs.writeFile(
        'wallet.json',
        JSON.stringify(account))
}

createWallet()
.catch(err => console.log('error creating wallet', err))
