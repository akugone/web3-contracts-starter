import { task } from 'hardhat/config'
import { getConfig, Network, NetworkConfig } from './config'
import { set, ConfigProperty } from '../.deployment/deploymentManager'

// npx hardhat deploy --verify --network goerli
task('deploy')
  .addFlag('verify', 'verify contracts on etherscan')
  .setAction(async (args, { ethers, run, network }) => {
    try {
      const { verify } = args
      const chainId = network.config.chainId ? network.config.chainId : Network.LOCAL
      const networkConfig: NetworkConfig = getConfig(chainId)

      console.log('Network')
      console.log(network.name)
      console.log('Task Args')
      console.log(args)

      await run('compile')

      //Deploy Treasure hunt Contract
      const Storage = await ethers.getContractFactory('Storage')
      // const storageArgs: [string] = []
      const storage = await Storage.deploy()
      if (verify) {
        await storage.deployTransaction.wait(5)
        await run('verify:verify', {
          address: storage.address,
        })
      }
      console.log('Treasure Hunt address:', storage.address)
      set(network.name as any as Network, ConfigProperty.TreasureHunt, storage.address)
    } catch (e) {
      console.log('------------------------')
      console.log('FAILED')
      console.error(e)
      console.log('------------------------')
      return 'FAILED'
    }
  })
