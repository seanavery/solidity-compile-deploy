import { promises as fs } from 'fs'
import { providers } from 'ethers'
import { config } from './deploy.config.js'

const deployContracts = async () => {
    const contractsPath = process.argv[2]
    if (typeof contractsPath === 'undefined')
        throw new Error('please provide contract directory path')

    const compiledData = await readCompiledData(contractsPath)

    const provider = initProvider()

    console.log('provider', provider)

    // await Promise.all(
    //     Object.keys(compiledData.contracts)
    //         .map(async contract => {
    //             await deployContract(compiledData.contracts[contract])}))

    await Promise.all(
        config.contracts.map(async contract => {
            await deployContract(contract)
        })
    )
}

const readCompiledData = async (contractsPath) => {
    try {
        const data = await fs.readFile(`${process.cwd()}/${contractsPath}/compiled.json`)
        return JSON.parse(data.toString('utf8'))
    } catch (err) {
        throw new Error('could not read compiled data', err)
    }
}

const deployContract = async (contract) => {
    try {

    } catch {
        throw new Error(`error deployin contract ${contract}`, err)
    }
}

const initProvider = () => {
    const network = providers.networks.ropsten
    return new providers.InfuraProvider(network)
}

deployContracts()
.catch(err => console.log('error deploying contracts', err))
