import { Deployer, DeployFunction, Network } from '@alephium/cli'
import { Settings } from '../alephium.config'
import { MintTestToken, TestToken } from '../artifacts/ts'

// This deploy function will be called by cli deployment tool automatically
// Note that deployment scripts should prefixed with numbers (starting from 0)
const deployFaucet: DeployFunction<Settings> = async (
  deployer: Deployer,
  network: Network<Settings>
): Promise<void> => {
  // Get settings
  const issueTokenAmount = BigInt(network.settings.issueTokenAmount)
  // const testADEX = await deployer.deployContract(TestToken, {
  //   // The amount of token to be issued
  //   issueTokenAmount: issueTokenAmount,
  //   // The initial states of the faucet contract
  //   initialFields: {
  //     symbol: Buffer.from('TADEX', 'utf8').toString('hex'),
  //     name: Buffer.from('Test ADEX', 'utf8').toString('hex'),
  //     decimals: 18n,
  //     supply: 0n
  //   }
  // })
  // console.log('Test ADEX contract id: ' + testADEX.contractInstance.contractId)
  // console.log('Test ADEX contract address: ' + testADEX.contractInstance.address)

  const testALPH = await deployer.deployContract(TestToken, {
    // The amount of token to be issued
    issueTokenAmount: issueTokenAmount,
    // The initial states of the faucet contract
    initialFields: {
      symbol: Buffer.from('TALPH', 'utf8').toString('hex'),
      name: Buffer.from('Test ALPH', 'utf8').toString('hex'),
      decimals: 18n,
      supply: 0n
    }
  })
  console.log('Test ALPH contract id: ' + testALPH.contractInstance.contractId)
  console.log('Test ALPH contract address: ' + testALPH.contractInstance.address)
}

export default deployFaucet
