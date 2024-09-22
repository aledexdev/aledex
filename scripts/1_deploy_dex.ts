import { TokenPair } from './../artifacts/ts/TokenPair'
import { Deployer, DeployFunction, Network } from '@alephium/cli'
import { Settings } from '../alephium.config'
import {
  FeeCollectorFactoryImpl,
  FeeCollectorPerTokenPairImpl,
  Router,
  TokenFaucet,
  TokenPairFactory
} from '../artifacts/ts'

// This deploy function will be called by cli deployment tool automatically
// Note that deployment scripts should prefixed with numbers (starting from 0)
const deployDex: DeployFunction<Settings> = async (deployer: Deployer, network: Network<Settings>): Promise<void> => {
  const PAIR_SIZE = 0n
  // Get settings
  const issueTokenAmount = network.settings.issueTokenAmount
  const token = await deployer.deployContract(TokenFaucet, {
    // The amount of token to be issued
    issueTokenAmount: issueTokenAmount,
    // The initial states of the faucet contract
    initialFields: {
      symbol: Buffer.from('TF', 'utf8').toString('hex'),
      name: Buffer.from('TokenFaucet', 'utf8').toString('hex'),
      decimals: 18n,
      supply: issueTokenAmount,
      balance: issueTokenAmount
    }
  })
  console.log('Token faucet contract id: ' + token.contractInstance.contractId)
  console.log('Token faucet contract address: ' + token.contractInstance.address)

  const feeCollectorPerTokenPairTemplate = await deployer.deployContract(FeeCollectorPerTokenPairImpl, {
    initialFields: {
      tokenPairFactory: token.contractInstance.contractId,
      tokenPair: token.contractInstance.contractId
    }
  })

  const tokenPairTemplate = await deployer.deployContract(TokenPair, {
    initialFields: {
      tokenPairFactory: token.contractInstance.contractId,
      token0Id: token.contractInstance.contractId,
      token1Id: token.contractInstance.contractId,
      reserve0: 0n,
      reserve1: 0n,
      blockTimeStampLast: 0n,
      price0CumulativeLast: 0n,
      price1CumulativeLast: 0n,
      totalSupply: 0n,
      kLast: 0n,
      feeCollectorId: token.contractInstance.contractId
    }
  })

  const feeCollectorFactory = await deployer.deployContract(FeeCollectorFactoryImpl, {
    initialFields: {
      feeCollectorPerTokenPairTemplateId: feeCollectorPerTokenPairTemplate.contractInstance.contractId,
      tokenPairFactory: token.contractInstance.contractId
    }
  })
  console.log('Fee collector factory contract id: ' + feeCollectorFactory.contractInstance.contractId)
  console.log('Fee collector factory contract address: ' + feeCollectorFactory.contractInstance.address)

  const tokenPairFactory = await deployer.deployContract(TokenPairFactory, {
    initialFields: {
      pairTemplateId: tokenPairTemplate.contractInstance.contractId,
      pairSize: PAIR_SIZE,
      feeSetter: deployer.account.address,
      feeCollectorFactory: feeCollectorFactory.contractInstance.contractId
    }
  })
  console.log('Token pair factory contract id: ' + tokenPairFactory.contractInstance.contractId)
  console.log('Token pair factory contract address: ' + tokenPairFactory.contractInstance.address)

  const router = await deployer.deployContract(Router, {
    initialFields: {}
  })
  console.log('Router contract id: ' + router.contractInstance.contractId)
  console.log('Router contract address: ' + router.contractInstance.address)
}

export default deployDex
