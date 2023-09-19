import { HardhatUserConfig } from 'hardhat/config'
import 'hardhat-contract-sizer'
import '@nomicfoundation/hardhat-toolbox'

import './scripts/tasks/deploy'
import './scripts/tasks/newtask'

import dotenv from 'dotenv'
import { log } from 'console'

dotenv.config()

const mnemonic = process.env.MNEMONIC

if (!mnemonic) {
  throw new Error('Please set your MNEMONIC in a .env file')
}

const infuraApiKey: string | undefined = process.env.INFURA_API_KEY
if (!infuraApiKey) {
  throw new Error('Please set your INFURA_API_KEY in a .env file')
}

const accounts = {
  mnemonic,
  count: 100,
}

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: '0.8.17',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  networks: {
    hardhat: {
      accounts: {
        mnemonic,
        count: 100,
      },
      chainId: 1337,
    },
    mumbai: {
      url: 'https://polygon-mumbai.infura.io/v3/' + infuraApiKey,
      accounts,
      chainId: 80001,
    },
    sepolia: {
      url: 'https://sepolia.infura.io/v3/' + infuraApiKey,
      accounts,
      chainId: 1337,
    },
  },
  etherscan: {
    apiKey: {
      polygonMumbai: process.env.POLYGONSCAN_API_KEY || '',
    },
  },
  contractSizer: {
    alphaSort: true,
    disambiguatePaths: false,
    runOnCompile: true,
    only: ['Storage'],
  },
}

export default config
