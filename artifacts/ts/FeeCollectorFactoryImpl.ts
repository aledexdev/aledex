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
import { default as FeeCollectorFactoryImplContractJson } from "../examples/FeeCollectorFactoryImpl.ral.json";
import { getContractByCodeHash } from "./contracts";

// Custom types for the contract
export namespace FeeCollectorFactoryImplTypes {
  export type Fields = {
    feeCollectorPerTokenPairTemplateId: HexString;
    tokenPairFactory: HexString;
  };

  export type State = ContractState<Fields>;

  export interface CallMethodTable {
    createFeeCollector: {
      params: CallContractParams<{
        caller: Address;
        alphAmount: bigint;
        tokenPair: HexString;
      }>;
      result: CallContractResult<HexString>;
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
  FeeCollectorFactoryImplInstance,
  FeeCollectorFactoryImplTypes.Fields
> {
  encodeFields(fields: FeeCollectorFactoryImplTypes.Fields) {
    return encodeContractFields(
      addStdIdToFields(this.contract, fields),
      this.contract.fieldsSig,
      []
    );
  }

  getInitialFieldsWithDefaultValues() {
    return this.contract.getInitialFieldsWithDefaultValues() as FeeCollectorFactoryImplTypes.Fields;
  }

  consts = { ErrorCodes: { InvalidCaller: BigInt(16) } };

  at(address: string): FeeCollectorFactoryImplInstance {
    return new FeeCollectorFactoryImplInstance(address);
  }

  tests = {
    createFeeCollector: async (
      params: TestContractParamsWithoutMaps<
        FeeCollectorFactoryImplTypes.Fields,
        { caller: Address; alphAmount: bigint; tokenPair: HexString }
      >
    ): Promise<TestContractResultWithoutMaps<HexString>> => {
      return testMethod(this, "createFeeCollector", params);
    },
  };
}

// Use this object to test and deploy the contract
export const FeeCollectorFactoryImpl = new Factory(
  Contract.fromJson(
    FeeCollectorFactoryImplContractJson,
    "",
    "966f75cddefe774a87dbf778012f4f3f494b3a860f4c975d0c5262a1be185d49",
    []
  )
);

// Use this class to interact with the blockchain
export class FeeCollectorFactoryImplInstance extends ContractInstance {
  constructor(address: Address) {
    super(address);
  }

  async fetchState(): Promise<FeeCollectorFactoryImplTypes.State> {
    return fetchContractState(FeeCollectorFactoryImpl, this);
  }

  methods = {
    createFeeCollector: async (
      params: FeeCollectorFactoryImplTypes.CallMethodParams<"createFeeCollector">
    ): Promise<
      FeeCollectorFactoryImplTypes.CallMethodResult<"createFeeCollector">
    > => {
      return callMethod(
        FeeCollectorFactoryImpl,
        this,
        "createFeeCollector",
        params,
        getContractByCodeHash
      );
    },
  };

  async multicall<Calls extends FeeCollectorFactoryImplTypes.MultiCallParams>(
    calls: Calls
  ): Promise<FeeCollectorFactoryImplTypes.MultiCallResults<Calls>> {
    return (await multicallMethods(
      FeeCollectorFactoryImpl,
      this,
      calls,
      getContractByCodeHash
    )) as FeeCollectorFactoryImplTypes.MultiCallResults<Calls>;
  }
}
