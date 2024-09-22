/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  Address,
  ExecutableScript,
  ExecuteScriptParams,
  ExecuteScriptResult,
  Script,
  SignerProvider,
  HexString,
} from "@alephium/web3";
import { default as AddLiquidityScriptJson } from "../scripts/AddLiquidity.ral.json";
import { default as BurnScriptJson } from "../scripts/Burn.ral.json";
import { default as CollectFeeScriptJson } from "../scripts/CollectFee.ral.json";
import { default as CreatePairScriptJson } from "../scripts/CreatePair.ral.json";
import { default as EnableFeeCollectorScriptJson } from "../scripts/EnableFeeCollector.ral.json";
import { default as MintScriptJson } from "../scripts/Mint.ral.json";
import { default as RemoveLiquidityScriptJson } from "../scripts/RemoveLiquidity.ral.json";
import { default as SetFeeCollectorFactoryScriptJson } from "../scripts/SetFeeCollectorFactory.ral.json";
import { default as SwapScriptJson } from "../scripts/Swap.ral.json";
import { default as SwapMaxInScriptJson } from "../scripts/SwapMaxIn.ral.json";
import { default as SwapMinOutScriptJson } from "../scripts/SwapMinOut.ral.json";
import { default as WithdrawScriptJson } from "../Withdraw.ral.json";
import { default as WithdrawFeesScriptJson } from "../scripts/WithdrawFees.ral.json";

export const AddLiquidity = new ExecutableScript<{
  sender: Address;
  router: HexString;
  pair: HexString;
  amount0Desired: bigint;
  amount1Desired: bigint;
  amount0Min: bigint;
  amount1Min: bigint;
  deadline: bigint;
}>(Script.fromJson(AddLiquidityScriptJson, "", []));

export const Burn = new ExecutableScript<{
  tokenPair: HexString;
  sender: Address;
  liquidity: bigint;
}>(Script.fromJson(BurnScriptJson, "", []));

export const CollectFee = new ExecutableScript<{ feeCollector: HexString }>(
  Script.fromJson(CollectFeeScriptJson, "", [])
);

export const CreatePair = new ExecutableScript<{
  payer: Address;
  factory: HexString;
  alphAmount: bigint;
  tokenAId: HexString;
  tokenBId: HexString;
}>(Script.fromJson(CreatePairScriptJson, "", []));

export const EnableFeeCollector = new ExecutableScript<{
  tokenPairFactory: HexString;
  tokenPair: HexString;
}>(Script.fromJson(EnableFeeCollectorScriptJson, "", []));

export const Mint = new ExecutableScript<{
  tokenPair: HexString;
  sender: Address;
  amount0: bigint;
  amount1: bigint;
}>(Script.fromJson(MintScriptJson, "", []));

export const RemoveLiquidity = new ExecutableScript<{
  sender: Address;
  router: HexString;
  pairId: HexString;
  liquidity: bigint;
  amount0Min: bigint;
  amount1Min: bigint;
  deadline: bigint;
}>(Script.fromJson(RemoveLiquidityScriptJson, "", []));

export const SetFeeCollectorFactory = new ExecutableScript<{
  tokenPairFactory: HexString;
  feeCollectorFactory: HexString;
}>(Script.fromJson(SetFeeCollectorFactoryScriptJson, "", []));

export const Swap = new ExecutableScript<{
  tokenPair: HexString;
  sender: Address;
  to: Address;
  amount0In: bigint;
  amount1In: bigint;
  amount0Out: bigint;
  amount1Out: bigint;
}>(Script.fromJson(SwapScriptJson, "", []));

export const SwapMaxIn = new ExecutableScript<{
  sender: Address;
  router: HexString;
  pair: HexString;
  tokenInId: HexString;
  amountInMax: bigint;
  amountOut: bigint;
  deadline: bigint;
}>(Script.fromJson(SwapMaxInScriptJson, "", []));

export const SwapMinOut = new ExecutableScript<{
  sender: Address;
  router: HexString;
  pair: HexString;
  tokenInId: HexString;
  amountIn: bigint;
  amountOutMin: bigint;
  deadline: bigint;
}>(Script.fromJson(SwapMinOutScriptJson, "", []));

export const Withdraw = new ExecutableScript<{
  token: HexString;
  amount: bigint;
}>(Script.fromJson(WithdrawScriptJson, "", []));

export const WithdrawFees = new ExecutableScript<{
  feeCollector: HexString;
  amount: bigint;
}>(Script.fromJson(WithdrawFeesScriptJson, "", []));
