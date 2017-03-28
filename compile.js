import Promise from 'bluebird';
import Eth from 'ethjs';
import solc from 'solc';

const fs = Promise.promisifyAll(require('fs'));
const jsonfile = Promise.promisifyAll(require('jsonfile'));

export let sources = new Object();
export let compiled;

export function compile() {
  return new Promise((resolve, reject) => {
    Promise.resolve(getContractFiles())
    .map((file) => {
      return getContractData(file);
    }).then(() => {
      return solcCompile();
    }).then(() => {
      return writeCompiledFile();
    }).then(() => {

    }).catch((error) => {
      reject(error);
    })
  });
}

export function getContractFiles() {
  return new Promise((resolve, reject) => {
    let files = [];
    console.log('cwd', process.cwd());
    fs.readdirAsync(`${process.cwd()}/EVM/contracts`)
    .map((file) => {
      files.push(file)
    }).then(() => {
      resolve(files);
    }).catch((error) => {
      reject(error);
    });
  });
}

export function getContractData(file) {
  return new Promise((resolve, reject) => {
    fs.readFileAsync(`${process.cwd()}/EVM/contracts/${file}`, 'utf8')
    .then((data) => {
      sources[file] = data.toString();
      resolve(data);
    }).catch((error) => {
      reject(error);
    });
  });
}

export function solcCompile() {
  return new Promise((resolve, reject) => {
    Promise.resolve(solc.compile({sources: sources}, 1))
    .then((data) => {
      compiled = data;
      resolve(compiled);
    }).catch((error) => {
      reject(error);
    });
  });
}

export function writeCompiledFile() {
  return new Promise((resolve, reject) => {
      Promise.resolve(jsonfile.writeFileAsync(`${process.cwd()}/EVM/compiled/compiled.json`, compiled))
      .then(() => {
        console.log('Compiled output saved in compiled.json');
        resolve(true);
      }).catch((error) => {
        reject(error);
      });
  })
}

compile();
