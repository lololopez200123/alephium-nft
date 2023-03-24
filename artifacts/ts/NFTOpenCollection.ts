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
    name: HexString;
    symbol: HexString;
    totalSupply: bigint;
    currentTokenIndex: bigint;
  };

  export type State = ContractState<Fields>;

  export type MintedEvent = ContractEvent<{
    minter: HexString;
    tokenIndex: bigint;
    tokenId: HexString;
  }>;

  export interface CallMethodTable {
    getName: {
      params: Omit<CallContractParams<{}>, "args">;
      result: CallContractResult<HexString>;
    };
    getSymbol: {
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
    getName: async (
      params: Omit<
        TestContractParams<NFTOpenCollectionTypes.Fields, never>,
        "testArgs"
      >
    ): Promise<TestContractResult<HexString>> => {
      return testMethod(this, "getName", params);
    },
    getSymbol: async (
      params: Omit<
        TestContractParams<NFTOpenCollectionTypes.Fields, never>,
        "testArgs"
      >
    ): Promise<TestContractResult<HexString>> => {
      return testMethod(this, "getSymbol", params);
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
    "2acc8b23be8debce084b4adfc46476bc462ba4ce27b0f82991630df945501f23"
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

  async getContractEventsCurrentCount(): Promise<number> {
    return getContractEventsCurrentCount(this.address);
  }

  subscribeMintedEvent(
    options: SubscribeOptions<NFTOpenCollectionTypes.MintedEvent>,
    fromCount?: number
  ): EventSubscription {
    return subscribeContractEvent(
      NFTOpenCollection.contract,
      this,
      options,
      "Minted",
      fromCount
    );
  }

  methods = {
    getName: async (
      params?: NFTOpenCollectionTypes.CallMethodParams<"getName">
    ): Promise<NFTOpenCollectionTypes.CallMethodResult<"getName">> => {
      return callMethod(
        NFTOpenCollection,
        this,
        "getName",
        params === undefined ? {} : params
      );
    },
    getSymbol: async (
      params?: NFTOpenCollectionTypes.CallMethodParams<"getSymbol">
    ): Promise<NFTOpenCollectionTypes.CallMethodResult<"getSymbol">> => {
      return callMethod(
        NFTOpenCollection,
        this,
        "getSymbol",
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
