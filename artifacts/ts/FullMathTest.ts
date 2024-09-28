/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  Address,
  Contract,
  ContractState,
  TestContractResult,
  HexString,
  ContractFactory,
  EventSubscribeOptions,
  EventSubscription,
  CallContractParams,
  CallContractResult,
  TestContractParams,
  ContractEvent,
  subscribeContractEvent,
  subscribeContractEvents,
  testMethod,
  callMethod,
  multicallMethods,
  fetchContractState,
  Asset,
  ContractInstance,
  getContractEventsCurrentCount,
  TestContractParamsWithoutMaps,
  TestContractResultWithoutMaps,
  SignExecuteContractMethodParams,
  SignExecuteScriptTxResult,
  signExecuteMethod,
  addStdIdToFields,
  encodeContractFields,
} from "@alephium/web3";
import { default as FullMathTestContractJson } from "../examples/FullMathTest.ral.json";
import { getContractByCodeHash } from "./contracts";

// Custom types for the contract
export namespace FullMathTestTypes {
  export type State = Omit<ContractState<any>, "fields">;

  export interface CallMethodTable {
    fullMul: {
      params: CallContractParams<{ x: bigint; y: bigint }>;
      result: CallContractResult<[bigint, bigint]>;
    };
    mulDiv: {
      params: CallContractParams<{ a: bigint; b: bigint; denominator: bigint }>;
      result: CallContractResult<bigint>;
    };
    fraction: {
      params: CallContractParams<{ numerator: bigint; denominator: bigint }>;
      result: CallContractResult<bigint>;
    };
  }
  export type CallMethodParams<T extends keyof CallMethodTable> =
    CallMethodTable[T]["params"];
  export type CallMethodResult<T extends keyof CallMethodTable> =
    CallMethodTable[T]["result"];
  export type MultiCallParams = Partial<{
    [Name in keyof CallMethodTable]: CallMethodTable[Name]["params"];
  }>;
  export type MultiCallResults<T extends MultiCallParams> = {
    [MaybeName in keyof T]: MaybeName extends keyof CallMethodTable
      ? CallMethodTable[MaybeName]["result"]
      : undefined;
  };
  export type MulticallReturnType<Callss extends MultiCallParams[]> = {
    [index in keyof Callss]: MultiCallResults<Callss[index]>;
  };

  export interface SignExecuteMethodTable {
    fullMul: {
      params: SignExecuteContractMethodParams<{ x: bigint; y: bigint }>;
      result: SignExecuteScriptTxResult;
    };
    mulDiv: {
      params: SignExecuteContractMethodParams<{
        a: bigint;
        b: bigint;
        denominator: bigint;
      }>;
      result: SignExecuteScriptTxResult;
    };
    fraction: {
      params: SignExecuteContractMethodParams<{
        numerator: bigint;
        denominator: bigint;
      }>;
      result: SignExecuteScriptTxResult;
    };
  }
  export type SignExecuteMethodParams<T extends keyof SignExecuteMethodTable> =
    SignExecuteMethodTable[T]["params"];
  export type SignExecuteMethodResult<T extends keyof SignExecuteMethodTable> =
    SignExecuteMethodTable[T]["result"];
}

class Factory extends ContractFactory<FullMathTestInstance, {}> {
  encodeFields() {
    return encodeContractFields({}, this.contract.fieldsSig, []);
  }

  consts = {
    Resolution: BigInt("112"),
    ErrorCodes: {
      FullDivOverflow: BigInt("0"),
      DivByZero: BigInt("1"),
      FractionOverflow: BigInt("2"),
    },
  };

  at(address: string): FullMathTestInstance {
    return new FullMathTestInstance(address);
  }

  tests = {
    fullMul: async (
      params: Omit<
        TestContractParamsWithoutMaps<never, { x: bigint; y: bigint }>,
        "initialFields"
      >
    ): Promise<TestContractResultWithoutMaps<[bigint, bigint]>> => {
      return testMethod(this, "fullMul", params, getContractByCodeHash);
    },
    mulDiv: async (
      params: Omit<
        TestContractParamsWithoutMaps<
          never,
          { a: bigint; b: bigint; denominator: bigint }
        >,
        "initialFields"
      >
    ): Promise<TestContractResultWithoutMaps<bigint>> => {
      return testMethod(this, "mulDiv", params, getContractByCodeHash);
    },
    fraction: async (
      params: Omit<
        TestContractParamsWithoutMaps<
          never,
          { numerator: bigint; denominator: bigint }
        >,
        "initialFields"
      >
    ): Promise<TestContractResultWithoutMaps<bigint>> => {
      return testMethod(this, "fraction", params, getContractByCodeHash);
    },
  };

  stateForTest(initFields: {}, asset?: Asset, address?: string) {
    return this.stateForTest_(initFields, asset, address, undefined);
  }
}

// Use this object to test and deploy the contract
export const FullMathTest = new Factory(
  Contract.fromJson(
    FullMathTestContractJson,
    "",
    "4e6bd23542804a31c9fdc85b4a0065857c11fcd0b7a40a7ce2c66558001e2040",
    []
  )
);

// Use this class to interact with the blockchain
export class FullMathTestInstance extends ContractInstance {
  constructor(address: Address) {
    super(address);
  }

  async fetchState(): Promise<FullMathTestTypes.State> {
    return fetchContractState(FullMathTest, this);
  }

  view = {
    fullMul: async (
      params: FullMathTestTypes.CallMethodParams<"fullMul">
    ): Promise<FullMathTestTypes.CallMethodResult<"fullMul">> => {
      return callMethod(
        FullMathTest,
        this,
        "fullMul",
        params,
        getContractByCodeHash
      );
    },
    mulDiv: async (
      params: FullMathTestTypes.CallMethodParams<"mulDiv">
    ): Promise<FullMathTestTypes.CallMethodResult<"mulDiv">> => {
      return callMethod(
        FullMathTest,
        this,
        "mulDiv",
        params,
        getContractByCodeHash
      );
    },
    fraction: async (
      params: FullMathTestTypes.CallMethodParams<"fraction">
    ): Promise<FullMathTestTypes.CallMethodResult<"fraction">> => {
      return callMethod(
        FullMathTest,
        this,
        "fraction",
        params,
        getContractByCodeHash
      );
    },
  };

  transact = {
    fullMul: async (
      params: FullMathTestTypes.SignExecuteMethodParams<"fullMul">
    ): Promise<FullMathTestTypes.SignExecuteMethodResult<"fullMul">> => {
      return signExecuteMethod(FullMathTest, this, "fullMul", params);
    },
    mulDiv: async (
      params: FullMathTestTypes.SignExecuteMethodParams<"mulDiv">
    ): Promise<FullMathTestTypes.SignExecuteMethodResult<"mulDiv">> => {
      return signExecuteMethod(FullMathTest, this, "mulDiv", params);
    },
    fraction: async (
      params: FullMathTestTypes.SignExecuteMethodParams<"fraction">
    ): Promise<FullMathTestTypes.SignExecuteMethodResult<"fraction">> => {
      return signExecuteMethod(FullMathTest, this, "fraction", params);
    },
  };

  async multicall<Callss extends FullMathTestTypes.MultiCallParams[]>(
    ...callss: Callss
  ): Promise<FullMathTestTypes.MulticallReturnType<Callss>> {
    return (await multicallMethods(
      FullMathTest,
      this,
      callss,
      getContractByCodeHash
    )) as FullMathTestTypes.MulticallReturnType<Callss>;
  }
}
