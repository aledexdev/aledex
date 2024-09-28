import { TokenPair } from './../artifacts/ts/TokenPair'
import {
  web3,
  TestContractParams,
  addressFromContractId,
  AssetOutput,
  DUST_AMOUNT,
  groupOfAddress
} from '@alephium/web3'
import { expectAssertionError, randomContractId, testAddress, testNodeWallet } from '@alephium/web3-test'
import { deployToDevnet } from '@alephium/cli'
import {
  AddLiquidity,
  CreatePair,
  FeeCollectorFactoryImpl,
  RemoveLiquidity,
  Router,
  RouterTypes,
  Swap,
  SwapMaxIn,
  SwapMinOut,
  TokenA,
  TokenB,
  TokenFaucet,
  TokenFaucetTypes,
  TokenPairFactory,
  TokenPairFactoryTypes,
  Withdraw
} from '../artifacts/ts'
import { loadFixture } from './utils'
import { token } from '@alephium/web3/dist/src/codec'

describe('[INTEGRATION TEST FOR DEX]', () => {
  const INITIAL_TOKEN_BALANCE = 1000000000000000000n
  const STAKING_BALANCE = 10000000000000000n
  const TWO_ALPH_FEE = 2000000000000000000n
  const ONE_ALPH_FEE = 1000000000000000000n
  const TEN_ALPH_FEE = 10000000000000000000n
  const DUST_AMOUNT = 1000000000000000n
  const ALPH_ID = '0000000000000000000000000000000000000000000000000000000000000000'
  const DELAY_PERIOD = 5000
  const DEADLINE = 17148068220000n //very large timestamp
  beforeEach(async () => {
    web3.setCurrentNodeProvider('http://127.0.0.1:22973', undefined, fetch)
  })

  it('Case 01: Should create pair successfully', async () => {
    const { signer, deployments, deployer, alice, bob, daniel } = await loadFixture()
    const testGroup = deployer.group

    const tokenA = deployments.getInstance(TokenA, testGroup)
    const tokenB = deployments.getInstance(TokenB, testGroup)
    const feeCollectorFactory = deployments.getInstance(FeeCollectorFactoryImpl, testGroup)
    const tokenPairFactory = deployments.getInstance(TokenPairFactory, testGroup)
    const router = deployments.getInstance(Router, testGroup)
    const routerId = router ? router.contractId : ''
    const tokenFactoryId = tokenPairFactory ? tokenPairFactory.contractId : ''
    const tokenAId = tokenA ? tokenA.contractId : ''
    const tokenBId = tokenB ? tokenB.contractId : ''

    await Withdraw.execute(signer, {
      initialFields: { token: tokenAId, amount: TEN_ALPH_FEE },
      attoAlphAmount: DUST_AMOUNT * 2n
    })
    await Withdraw.execute(signer, {
      initialFields: { token: tokenBId, amount: TEN_ALPH_FEE },
      attoAlphAmount: DUST_AMOUNT * 2n
    })

    await CreatePair.execute(signer, {
      initialFields: {
        payer: deployer.address,
        factory: tokenFactoryId,
        alphAmount: ONE_ALPH_FEE,
        tokenAId,
        tokenBId
      },
      tokens: [
        {
          id: ALPH_ID,
          amount: TWO_ALPH_FEE
        },
        {
          id: tokenAId,
          amount: ONE_ALPH_FEE
        },
        {
          id: tokenBId,
          amount: ONE_ALPH_FEE
        }
      ]
    })

    // await AddLiquidity.execute(signer, {
    //   initialFields: {
    //     sender: deployer.address,
    //     router: routerId,

    //   }
    // })
  }, 20000)

  it('Case 02: Should add liquidity successfully', async () => {
    const { signer, deployments, deployer, alice, bob, daniel } = await loadFixture()
    const testGroup = deployer.group

    const tokenA = deployments.getInstance(TokenA, testGroup)
    const tokenB = deployments.getInstance(TokenB, testGroup)
    const feeCollectorFactory = deployments.getInstance(FeeCollectorFactoryImpl, testGroup)
    const tokenPairFactory = deployments.getInstance(TokenPairFactory, testGroup)
    const router = deployments.getInstance(Router, testGroup)
    const routerId = router ? router.contractId : ''
    const tokenFactoryId = tokenPairFactory ? tokenPairFactory.contractId : ''
    const tokenAId = tokenA ? tokenA.contractId : ''
    const tokenBId = tokenB ? tokenB.contractId : ''

    await Withdraw.execute(signer, {
      initialFields: { token: tokenAId, amount: TEN_ALPH_FEE },
      attoAlphAmount: DUST_AMOUNT * 2n
    })
    await Withdraw.execute(signer, {
      initialFields: { token: tokenBId, amount: TEN_ALPH_FEE },
      attoAlphAmount: DUST_AMOUNT * 2n
    })

    const events: TokenPairFactoryTypes.PairCreatedEvent[] = []
    const subscribeOptions = {
      // It will check for new events from the full node every `pollingInterval`
      pollingInterval: 500,
      // The callback function will be called for each event
      messageCallback: (event: TokenPairFactoryTypes.PairCreatedEvent): Promise<void> => {
        events.push(event)
        return Promise.resolve()
      },
      // This callback function will be called when an error occurs
      errorCallback: (error: any, subscription): Promise<void> => {
        console.log(error)
        subscription.unsubscribe()
        return Promise.resolve()
      }
    }
    const subscription = tokenPairFactory?.subscribePairCreatedEvent(subscribeOptions, 0)

    const createPairTx = await CreatePair.execute(signer, {
      initialFields: {
        payer: deployer.address,
        factory: tokenFactoryId,
        alphAmount: ONE_ALPH_FEE,
        tokenAId,
        tokenBId
      },
      tokens: [
        {
          id: ALPH_ID,
          amount: TWO_ALPH_FEE
        },
        {
          id: tokenAId,
          amount: ONE_ALPH_FEE
        },
        {
          id: tokenBId,
          amount: ONE_ALPH_FEE
        }
      ]
    })

    await new Promise((resolve) => setTimeout(resolve, 1000))
    console.log(JSON.stringify(events, null, 2))
    subscription?.unsubscribe()

    const pairId = events[0].fields.pair

    await AddLiquidity.execute(signer, {
      initialFields: {
        sender: deployer.address,
        router: routerId,
        pair: pairId,
        amount0Desired: ONE_ALPH_FEE,
        amount1Desired: ONE_ALPH_FEE,
        amount0Min: 0n,
        amount1Min: 0n,
        deadline: DEADLINE
      },
      tokens: [
        {
          id: tokenAId,
          amount: ONE_ALPH_FEE
        },
        {
          id: tokenBId,
          amount: ONE_ALPH_FEE
        }
      ]
    })
  }, 20000)

  it('Case 03: Should remove liquidity successfully', async () => {
    const { signer, deployments, deployer, alice, bob, daniel } = await loadFixture()
    const testGroup = deployer.group

    const tokenA = deployments.getInstance(TokenA, testGroup)
    const tokenB = deployments.getInstance(TokenB, testGroup)
    const feeCollectorFactory = deployments.getInstance(FeeCollectorFactoryImpl, testGroup)
    const tokenPairFactory = deployments.getInstance(TokenPairFactory, testGroup)
    const router = deployments.getInstance(Router, testGroup)
    const routerId = router ? router.contractId : ''
    const tokenFactoryId = tokenPairFactory ? tokenPairFactory.contractId : ''
    const tokenAId = tokenA ? tokenA.contractId : ''
    const tokenBId = tokenB ? tokenB.contractId : ''

    await Withdraw.execute(signer, {
      initialFields: { token: tokenAId, amount: TEN_ALPH_FEE },
      attoAlphAmount: DUST_AMOUNT * 2n
    })
    await Withdraw.execute(signer, {
      initialFields: { token: tokenBId, amount: TEN_ALPH_FEE },
      attoAlphAmount: DUST_AMOUNT * 2n
    })

    const events: TokenPairFactoryTypes.PairCreatedEvent[] = []
    const subscribeOptions = {
      // It will check for new events from the full node every `pollingInterval`
      pollingInterval: 500,
      // The callback function will be called for each event
      messageCallback: (event: TokenPairFactoryTypes.PairCreatedEvent): Promise<void> => {
        events.push(event)
        return Promise.resolve()
      },
      // This callback function will be called when an error occurs
      errorCallback: (error: any, subscription): Promise<void> => {
        console.log(error)
        subscription.unsubscribe()
        return Promise.resolve()
      }
    }
    const subscription = tokenPairFactory?.subscribePairCreatedEvent(subscribeOptions, 0)

    const addLpEvents: RouterTypes.AddLPEvent[] = []
    const addLpSubscribeOptions = {
      // It will check for new events from the full node every `pollingInterval`
      pollingInterval: 500,
      // The callback function will be called for each event
      messageCallback: (event: RouterTypes.AddLPEvent): Promise<void> => {
        addLpEvents.push(event)
        return Promise.resolve()
      },
      // This callback function will be called when an error occurs
      errorCallback: (error: any, subscription): Promise<void> => {
        console.log(error)
        subscription.unsubscribe()
        return Promise.resolve()
      }
    }
    const addLpSubscription = router?.subscribeAddLPEvent(addLpSubscribeOptions, 0)

    const createPairTx = await CreatePair.execute(signer, {
      initialFields: {
        payer: deployer.address,
        factory: tokenFactoryId,
        alphAmount: ONE_ALPH_FEE,
        tokenAId,
        tokenBId
      },
      tokens: [
        {
          id: ALPH_ID,
          amount: TWO_ALPH_FEE
        },
        {
          id: tokenAId,
          amount: ONE_ALPH_FEE
        },
        {
          id: tokenBId,
          amount: ONE_ALPH_FEE
        }
      ]
    })

    await new Promise((resolve) => setTimeout(resolve, 1000))
    console.log(JSON.stringify(events, null, 2))
    subscription?.unsubscribe()

    const pairId = events[0].fields.pair

    await AddLiquidity.execute(signer, {
      initialFields: {
        sender: deployer.address,
        router: routerId,
        pair: pairId,
        amount0Desired: ONE_ALPH_FEE,
        amount1Desired: ONE_ALPH_FEE,
        amount0Min: 0n,
        amount1Min: 0n,
        deadline: DEADLINE
      },
      tokens: [
        {
          id: tokenAId,
          amount: ONE_ALPH_FEE
        },
        {
          id: tokenBId,
          amount: ONE_ALPH_FEE
        }
      ]
    })

    await new Promise((resolve) => setTimeout(resolve, 1000))
    console.log(JSON.stringify(addLpEvents, null, 2))
    const lpAmount = addLpEvents[0].fields.liquidity
    addLpSubscription?.unsubscribe()

    await RemoveLiquidity.execute(signer, {
      initialFields: {
        sender: deployer.address,
        router: routerId,
        pairId,
        liquidity: lpAmount,
        amount0Min: 0n,
        amount1Min: 0n,
        deadline: DEADLINE
      },
      tokens: [
        {
          id: pairId,
          amount: lpAmount
        }
      ],
      attoAlphAmount: DUST_AMOUNT * 2n
    })
  }, 20000)

  it('Case 04: Should swap successfully', async () => {
    const { signer, deployments, deployer, alice, bob, daniel } = await loadFixture()
    const testGroup = deployer.group

    const tokenA = deployments.getInstance(TokenA, testGroup)
    const tokenB = deployments.getInstance(TokenB, testGroup)
    const feeCollectorFactory = deployments.getInstance(FeeCollectorFactoryImpl, testGroup)
    const tokenPairFactory = deployments.getInstance(TokenPairFactory, testGroup)
    const router = deployments.getInstance(Router, testGroup)
    const routerId = router ? router.contractId : ''
    const tokenFactoryId = tokenPairFactory ? tokenPairFactory.contractId : ''
    const tokenAId = tokenA ? tokenA.contractId : ''
    const tokenBId = tokenB ? tokenB.contractId : ''

    await Withdraw.execute(signer, {
      initialFields: { token: tokenAId, amount: TEN_ALPH_FEE },
      attoAlphAmount: DUST_AMOUNT * 2n
    })
    await Withdraw.execute(signer, {
      initialFields: { token: tokenBId, amount: TEN_ALPH_FEE },
      attoAlphAmount: DUST_AMOUNT * 2n
    })

    const events: TokenPairFactoryTypes.PairCreatedEvent[] = []
    const subscribeOptions = {
      // It will check for new events from the full node every `pollingInterval`
      pollingInterval: 500,
      // The callback function will be called for each event
      messageCallback: (event: TokenPairFactoryTypes.PairCreatedEvent): Promise<void> => {
        events.push(event)
        return Promise.resolve()
      },
      // This callback function will be called when an error occurs
      errorCallback: (error: any, subscription): Promise<void> => {
        console.log(error)
        subscription.unsubscribe()
        return Promise.resolve()
      }
    }
    const subscription = tokenPairFactory?.subscribePairCreatedEvent(subscribeOptions, 0)

    const createPairTx = await CreatePair.execute(signer, {
      initialFields: {
        payer: deployer.address,
        factory: tokenFactoryId,
        alphAmount: ONE_ALPH_FEE,
        tokenAId,
        tokenBId
      },
      tokens: [
        {
          id: ALPH_ID,
          amount: TWO_ALPH_FEE
        },
        {
          id: tokenAId,
          amount: ONE_ALPH_FEE
        },
        {
          id: tokenBId,
          amount: ONE_ALPH_FEE
        }
      ]
    })

    await new Promise((resolve) => setTimeout(resolve, 1000))
    console.log(JSON.stringify(events, null, 2))
    subscription?.unsubscribe()

    const pairId = events[0].fields.pair

    await AddLiquidity.execute(signer, {
      initialFields: {
        sender: deployer.address,
        router: routerId,
        pair: pairId,
        amount0Desired: ONE_ALPH_FEE,
        amount1Desired: ONE_ALPH_FEE,
        amount0Min: 0n,
        amount1Min: 0n,
        deadline: DEADLINE
      },
      tokens: [
        {
          id: tokenAId,
          amount: ONE_ALPH_FEE
        },
        {
          id: tokenBId,
          amount: ONE_ALPH_FEE
        }
      ]
    })

    await SwapMinOut.execute(signer, {
      initialFields: {
        sender: deployer.address,
        router: routerId,
        pair: pairId,
        tokenInId: tokenAId,
        amountIn: ONE_ALPH_FEE,
        amountOutMin: 0n,
        deadline: DEADLINE
      },
      tokens: [
        {
          id: tokenAId,
          amount: ONE_ALPH_FEE
        }
      ],
      attoAlphAmount: DUST_AMOUNT
    })
  }, 20000)
})
