import { Deployer, DeployFunction, Network } from '@alephium/cli'
import { Settings } from '../alephium.config'
import { TokenA, TokenB } from '../artifacts/ts'

// This deploy function will be called by cli deployment tool automatically
// Note that deployment scripts should prefixed with numbers (starting from 0)
const deployFaucet: DeployFunction<Settings> = async (
  deployer: Deployer,
  network: Network<Settings>
): Promise<void> => {
  // Get settings
  const issueTokenAmount = network.settings.issueTokenAmount
  const tokenA = await deployer.deployContract(TokenA, {
    // The amount of token to be issued
    issueTokenAmount: issueTokenAmount,
    // The initial states of the faucet contract
    initialFields: {
      symbol: Buffer.from('TKA', 'utf8').toString('hex'),
      name: Buffer.from('Token A', 'utf8').toString('hex'),
      decimals: 18n,
      supply: issueTokenAmount,
      balance: issueTokenAmount
    }
  })
  console.log('Token A contract id: ' + tokenA.contractInstance.contractId)
  console.log('Token A contract address: ' + tokenA.contractInstance.address)

  const tokenB = await deployer.deployContract(TokenB, {
    // The amount of token to be issued
    issueTokenAmount: issueTokenAmount,
    // The initial states of the faucet contract
    initialFields: {
      symbol: Buffer.from('TKB', 'utf8').toString('hex'),
      name: Buffer.from('Token B', 'utf8').toString('hex'),
      decimals: 18n,
      supply: issueTokenAmount,
      balance: issueTokenAmount
    }
  })
  console.log('Token B contract id: ' + tokenB.contractInstance.contractId)
  console.log('Token B contract address: ' + tokenB.contractInstance.address)
}

export default deployFaucet
