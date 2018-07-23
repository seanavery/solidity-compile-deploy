import { promises as fs } from 'fs'
import { providers } from 'ethers'
import { config } from './deploy.config.js'
import wallet from './wallet.json'

const deployContracts = async () => {
    const contractsPath = config.contractsDir
    await checkContractsPath(contractsPath)

    const compiledData = await readCompiledData(contractsPath)

    const provider = initProvider()
    
    await Promise.all(
        config.contracts.map(async contract => {
            await deployContract(contract.concat(`.sol:${contract}`), compiledData)
        })
    )
}

const checkContractsPath = async (contractsPath) => {
    try {
        const stats = await fs.stat(contractsPath)
    } catch (err) {
        throw new Error(`contract path '${contractsPath}' does not exist`, err)
    }
}

const readCompiledData = async (contractsPath) => {
    try {
        const data = await fs.readFile(`${process.cwd()}/${contractsPath}/compiled.json`)
        return JSON.parse(data.toString('utf8'))
    } catch (err) {
        throw new Error('could not read compiled data', err)
    }
}

const deployContract = async (contract, compiledData) => {
    console.log('compiledData.contracts', compiledData.contracts[contract].bytecode)
    console.log('contract', contract)
    // console.log('contracts[contracts]', compiledData.contracts[contract])
    // try {
    //     console.log('contracts[contracts]', contracts[contract])
    // } catch {
    //     throw new Error(`error deploying contract ${contract}`, err)
    // }
}

const initProvider = () => {
    const network = providers.networks.ropsten
    return new providers.InfuraProvider(network)
}

deployContracts()
.catch(err => console.log('error deploying contracts', err))
