import { promises as fs } from 'fs'
import solc from 'solc'
import { config } from './deploy.config.js'

export const compile = async () => {
    const contractsPath = config.contracstDir

    console.log('contractsPath', contractsPath)
    await checkContractsPath(contractsPath)

    const contracts = await getContractFiles(contractsPath)

    const contractsData = {}
    await Promise.all(
        contracts.map(async contract => {
            const contractData = await getContractData(contractsPath, contract)
            contractsData[contract] = contractData
        })
    )

    const compiledData = await compileContracts(contractsData)

    await writeCompiledData(compiledData)
}

const checkContractsPath = async (contractsPath) => {
    try {
        const stats = await fs.stat(contractsPath)
    } catch (err) {
        throw new Error(`contract path '${contractsPath}' does not exist`, err)
    }
}

const getContractFiles = async (contractPath) => {
    try {
        await fs.stat(contractPath)
    } catch (err) {
        throw new Error(`no directory at ${process.cwd()}/${contractPath}`)
    }

    try {
        const contracts = await fs.readdir(`${process.cwd()}/contracts`)
        return contracts
    } catch (err) {
        throw new Error('could not read contract files')
    }
}

const getContractData = async (contractPath, contract) => {
    try {
        const data = await fs.readFile(`${process.cwd()}/${contractPath}/${contract}`, 'utf8')
        return data.toString()
    } catch (err) {
        throw new Error('could not read contract file')
    }
}

const compileContracts = async (contractsData) => {
    try {
        const compiledData = await solc.compile({sources: contractsData}, 1)
        return compiledData
    } catch (err) {
        throw new Error('could not compile contract', err)
    }
}

const writeCompiledData = async (compiledData) => {
    try {
        await fs.writeFile(
            `${process.cwd()}/contracts/compiled.json`,
            JSON.stringify(compiledData))
    } catch (err) {
        throw new Error('could not write compiled data to json file', err)
    }
}

compile()
.catch(err => console.log('error compiling contracts', err))
