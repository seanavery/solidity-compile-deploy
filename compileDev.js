import { promises as fs } from 'fs'
import solc from 'solc'

export const compile = async () => {
    if (typeof process.argv[2] === 'undefined')
        throw new Error('please provide contract directory path')
    const contracts = await getContractFiles(process.argv[2])

    const contractsData = {}
    await Promise.all(
        contracts.map(async contract => {
            const contractData = await getContractData(process.argv[2], contract)
            contractsData[contract] = contractData
        })
    )

    const compiledData = await compileContracts(contractsData)
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

compile()
