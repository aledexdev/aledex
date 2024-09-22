import { deployToDevnet } from '@alephium/cli'
import { testNodeWallet } from '@alephium/web3-test'

export const loadFixture = async () => {
  const signer = await testNodeWallet()
  const deployments = await deployToDevnet()
  const accounts = await signer.getAccounts()
  const deployer = accounts[0]
  const alice = accounts[1]
  const bob = accounts[2]
  const daniel = accounts[3]

  return { signer, deployments, accounts, deployer, alice, bob, daniel }
}

export const delay = (ms: number) => new Promise((r) => setTimeout(r, ms))
