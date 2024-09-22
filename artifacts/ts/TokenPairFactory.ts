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
  ContractInstance,
  getContractEventsCurrentCount,
  TestContractParamsWithoutMaps,
  TestContractResultWithoutMaps,
  addStdIdToFields,
  encodeContractFields,
} from "@alephium/web3";
import { default as TokenPairFactoryContractJson } from "../TokenPairFactory.ral.json";
import { getContractByCodeHash } from "./contracts";

// Custom types for the contract
export namespace TokenPairFactoryTypes {
  export type Fields = {
    pairTemplateId: HexString;
    pairSize: bigint;
    feeSetter: Address;
    feeCollectorFactory: HexString;
  };

  export type State = ContractState<Fields>;

  export type PairCreatedEvent = ContractEvent<{
    token0: HexString;
    token1: HexString;
    pair: HexString;
    currentPairSize: bigint;
  }>;

  export interface CallMethodTable {
    getFeeSetter: {
      params: Omit<CallContractParams<{}>, "args">;
      result: CallContractResult<Address>;
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
}

class Factory extends ContractFactory<
  TokenPairFactoryInstance,
  TokenPairFactoryTypes.Fields
> {
  encodeFields(fields: TokenPairFactoryTypes.Fields) {
    return encodeContractFields(
      addStdIdToFields(this.contract, fields),
      this.contract.fieldsSig,
      []
    );
  }

  getInitialFieldsWithDefaultValues() {
    return this.contract.getInitialFieldsWithDefaultValues() as TokenPairFactoryTypes.Fields;
  }

  eventIndex = { PairCreated: 0 };
  consts = {
    ErrorCodes: {
      IdenticalTokenIds: BigInt(11),
      TokenNotExist: BigInt(15),
      InvalidCaller: BigInt(16),
    },
  };

  at(address: string): TokenPairFactoryInstance {
    return new TokenPairFactoryInstance(address);
  }

  tests = {
    setFeeCollectorFactory: async (
      params: TestContractParamsWithoutMaps<
        TokenPairFactoryTypes.Fields,
        { factory: HexString }
      >
    ): Promise<TestContractResultWithoutMaps<null>> => {
      return testMethod(this, "setFeeCollectorFactory", params);
    },
    updateFeeSetter: async (
      params: TestContractParamsWithoutMaps<
        TokenPairFactoryTypes.Fields,
        { newFeeSetter: Address }
      >
    ): Promise<TestContractResultWithoutMaps<null>> => {
      return testMethod(this, "updateFeeSetter", params);
    },
    getFeeSetter: async (
      params: Omit<
        TestContractParamsWithoutMaps<TokenPairFactoryTypes.Fields, never>,
        "testArgs"
      >
    ): Promise<TestContractResultWithoutMaps<Address>> => {
      return testMethod(this, "getFeeSetter", params);
    },
    enableFeeCollector: async (
      params: TestContractParamsWithoutMaps<
        TokenPairFactoryTypes.Fields,
        { tokenPair: HexString; alphAmount: bigint }
      >
    ): Promise<TestContractResultWithoutMaps<null>> => {
      return testMethod(this, "enableFeeCollector", params);
    },
    updateFeeCollector: async (
      params: TestContractParamsWithoutMaps<
        TokenPairFactoryTypes.Fields,
        { tokenPair: HexString; newFeeCollectorId: HexString }
      >
    ): Promise<TestContractResultWithoutMaps<null>> => {
      return testMethod(this, "updateFeeCollector", params);
    },
    sortTokens: async (
      params: TestContractParamsWithoutMaps<
        TokenPairFactoryTypes.Fields,
        { tokenA: HexString; tokenB: HexString }
      >
    ): Promise<TestContractResultWithoutMaps<[HexString, HexString]>> => {
      return testMethod(this, "sortTokens", params);
    },
    createPair: async (
      params: TestContractParamsWithoutMaps<
        TokenPairFactoryTypes.Fields,
        {
          payer: Address;
          alphAmount: bigint;
          tokenAId: HexString;
          tokenBId: HexString;
        }
      >
    ): Promise<TestContractResultWithoutMaps<null>> => {
      return testMethod(this, "createPair", params);
    },
  };
}

// Use this object to test and deploy the contract
export const TokenPairFactory = new Factory(
  Contract.fromJson(
    TokenPairFactoryContractJson,
    "",
    "44144899a2b71465a80654889afa8a2bf4a8f3cd0f30ad1880d2ffc7c12ad18b",
    []
  )
);

// Use this class to interact with the blockchain
export class TokenPairFactoryInstance extends ContractInstance {
  constructor(address: Address) {
    super(address);
  }

  async fetchState(): Promise<TokenPairFactoryTypes.State> {
    return fetchContractState(TokenPairFactory, this);
  }

  async getContractEventsCurrentCount(): Promise<number> {
    return getContractEventsCurrentCount(this.address);
  }

  subscribePairCreatedEvent(
    options: EventSubscribeOptions<TokenPairFactoryTypes.PairCreatedEvent>,
    fromCount?: number
  ): EventSubscription {
    return subscribeContractEvent(
      TokenPairFactory.contract,
      this,
      options,
      "PairCreated",
      fromCount
    );
  }

  methods = {
    getFeeSetter: async (
      params?: TokenPairFactoryTypes.CallMethodParams<"getFeeSetter">
    ): Promise<TokenPairFactoryTypes.CallMethodResult<"getFeeSetter">> => {
      return callMethod(
        TokenPairFactory,
        this,
        "getFeeSetter",
        params === undefined ? {} : params,
        getContractByCodeHash
      );
    },
  };

  async multicall<Calls extends TokenPairFactoryTypes.MultiCallParams>(
    calls: Calls
  ): Promise<TokenPairFactoryTypes.MultiCallResults<Calls>> {
    return (await multicallMethods(
      TokenPairFactory,
      this,
      calls,
      getContractByCodeHash
    )) as TokenPairFactoryTypes.MultiCallResults<Calls>;
  }
}
