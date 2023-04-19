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
  SubscribeOptions,
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
} from "@alephium/web3";
import { default as NFTOpenCollectionContractJson } from "../nft/nft_open_collection.ral.json";

// Custom types for the contract
export namespace NFTOpenCollectionTypes {
  export type Fields = {
    nftTemplateId: HexString;
    uri: HexString;
    totalSupply: bigint;
  };

  export type State = ContractState<Fields>;

  export interface CallMethodTable {
    getCollectionUri: {
      params: Omit<CallContractParams<{}>, "args">;
      result: CallContractResult<HexString>;
    };
    totalSupply: {
      params: Omit<CallContractParams<{}>, "args">;
      result: CallContractResult<bigint>;
    };
    nftByIndex: {
      params: CallContractParams<{ index: bigint }>;
      result: CallContractResult<HexString>;
    };
    mint: {
      params: CallContractParams<{ nftUri: HexString }>;
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
  NFTOpenCollectionInstance,
  NFTOpenCollectionTypes.Fields
> {
  at(address: string): NFTOpenCollectionInstance {
    return new NFTOpenCollectionInstance(address);
  }

  tests = {
    getCollectionUri: async (
      params: Omit<
        TestContractParams<NFTOpenCollectionTypes.Fields, never>,
        "testArgs"
      >
    ): Promise<TestContractResult<HexString>> => {
      return testMethod(this, "getCollectionUri", params);
    },
    totalSupply: async (
      params: Omit<
        TestContractParams<NFTOpenCollectionTypes.Fields, never>,
        "testArgs"
      >
    ): Promise<TestContractResult<bigint>> => {
      return testMethod(this, "totalSupply", params);
    },
    nftByIndex: async (
      params: TestContractParams<
        NFTOpenCollectionTypes.Fields,
        { index: bigint }
      >
    ): Promise<TestContractResult<HexString>> => {
      return testMethod(this, "nftByIndex", params);
    },
    mint: async (
      params: TestContractParams<
        NFTOpenCollectionTypes.Fields,
        { nftUri: HexString }
      >
    ): Promise<TestContractResult<HexString>> => {
      return testMethod(this, "mint", params);
    },
  };
}

// Use this object to test and deploy the contract
export const NFTOpenCollection = new Factory(
  Contract.fromJson(
    NFTOpenCollectionContractJson,
    "",
    "935e1ff93c3598140e0d2a2187b3c55d06e764d27a44fd0933fff1606574628f"
  )
);

// Use this class to interact with the blockchain
export class NFTOpenCollectionInstance extends ContractInstance {
  constructor(address: Address) {
    super(address);
  }

  async fetchState(): Promise<NFTOpenCollectionTypes.State> {
    return fetchContractState(NFTOpenCollection, this);
  }

  methods = {
    getCollectionUri: async (
      params?: NFTOpenCollectionTypes.CallMethodParams<"getCollectionUri">
    ): Promise<NFTOpenCollectionTypes.CallMethodResult<"getCollectionUri">> => {
      return callMethod(
        NFTOpenCollection,
        this,
        "getCollectionUri",
        params === undefined ? {} : params
      );
    },
    totalSupply: async (
      params?: NFTOpenCollectionTypes.CallMethodParams<"totalSupply">
    ): Promise<NFTOpenCollectionTypes.CallMethodResult<"totalSupply">> => {
      return callMethod(
        NFTOpenCollection,
        this,
        "totalSupply",
        params === undefined ? {} : params
      );
    },
    nftByIndex: async (
      params: NFTOpenCollectionTypes.CallMethodParams<"nftByIndex">
    ): Promise<NFTOpenCollectionTypes.CallMethodResult<"nftByIndex">> => {
      return callMethod(NFTOpenCollection, this, "nftByIndex", params);
    },
    mint: async (
      params: NFTOpenCollectionTypes.CallMethodParams<"mint">
    ): Promise<NFTOpenCollectionTypes.CallMethodResult<"mint">> => {
      return callMethod(NFTOpenCollection, this, "mint", params);
    },
  };

  async multicall<Calls extends NFTOpenCollectionTypes.MultiCallParams>(
    calls: Calls
  ): Promise<NFTOpenCollectionTypes.MultiCallResults<Calls>> {
    return (await multicallMethods(
      NFTOpenCollection,
      this,
      calls
    )) as NFTOpenCollectionTypes.MultiCallResults<Calls>;
  }
}
