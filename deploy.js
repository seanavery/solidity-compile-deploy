import Promise from 'bluebird';
import Eth from 'ethjs';

const fs = Promise.promisifyAll(require('fs'));
const jsonfile = Promise.promisifyAll(require('jsonfile'));

let HttpProvider;
let eth;

export function deploy() {
  return new Promise((resolve, reject) => {
    Promise.resolve(web3Provider())
    .then(() => {
      getCompiled();
    }).catch((error) => {
      reject(error);
    });
  });
}

export function web3Provider() {
  return new Promise((resolve, reject) => {
    Promise.delay(0)
    .then(() => {
      eth = new Eth(new Eth.HttpProvider('http://localhost:8545'));
      resolve(true);
    }).catch((error) => {
      reject(error);
    })
  });
}

export function getCompiled() {
  return new Promise((resolve, reject) => {
    jsonfile.readFileAsync(`${process.cwd()}/EVM/compiled/compiled.json`)
    .then((data) => {
      console.log('data', data);
      resolve(true);
    }).catch((error) => {
      reject(error);
    });
  });
}

deploy();
