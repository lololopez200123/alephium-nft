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
} from "@alephium/web3";
import { default as NFTOpenCollectionWithRoyaltyContractJson } from "../nft/open/NFTOpenCollectionWithRoyalty.ral.json";
import { getContractByCodeHash } from "./contracts";

// Custom types for the contract
export namespace NFTOpenCollectionWithRoyaltyTypes {
  export type Fields = {
    nftTemplateId: HexString;
    collectionUri: HexString;
    collectionOwner: Address;
    royaltyRate: bigint;
    totalSupply: bigint;
  };

  export type State = ContractState<Fields>;

  export type MintEvent = ContractEvent<{ minter: Address; index: bigint }>;

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
    royaltyAmount: {
      params: CallContractParams<{ tokenId: HexString; salePrice: bigint }>;
      result: CallContractResult<bigint>;
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
  NFTOpenCollectionWithRoyaltyInstance,
  NFTOpenCollectionWithRoyaltyTypes.Fields
> {
  eventIndex = { Mint: 0 };
  consts = {
    ErrorCodes: { NFTNotFound: BigInt(0), TokenOwnerAllowedOnly: BigInt(1) },
  };

  at(address: string): NFTOpenCollectionWithRoyaltyInstance {
    return new NFTOpenCollectionWithRoyaltyInstance(address);
  }

  tests = {
    getCollectionUri: async (
      params: Omit<
        TestContractParams<NFTOpenCollectionWithRoyaltyTypes.Fields, never>,
        "testArgs"
      >
    ): Promise<TestContractResult<HexString>> => {
      return testMethod(this, "getCollectionUri", params);
    },
    totalSupply: async (
      params: Omit<
        TestContractParams<NFTOpenCollectionWithRoyaltyTypes.Fields, never>,
        "testArgs"
      >
    ): Promise<TestContractResult<bigint>> => {
      return testMethod(this, "totalSupply", params);
    },
    nftByIndex: async (
      params: TestContractParams<
        NFTOpenCollectionWithRoyaltyTypes.Fields,
        { index: bigint }
      >
    ): Promise<TestContractResult<HexString>> => {
      return testMethod(this, "nftByIndex", params);
    },
    royaltyAmount: async (
      params: TestContractParams<
        NFTOpenCollectionWithRoyaltyTypes.Fields,
        { tokenId: HexString; salePrice: bigint }
      >
    ): Promise<TestContractResult<bigint>> => {
      return testMethod(this, "royaltyAmount", params);
    },
    payRoyalty: async (
      params: TestContractParams<
        NFTOpenCollectionWithRoyaltyTypes.Fields,
        { amount: bigint }
      >
    ): Promise<TestContractResult<null>> => {
      return testMethod(this, "payRoyalty", params);
    },
    mint: async (
      params: TestContractParams<
        NFTOpenCollectionWithRoyaltyTypes.Fields,
        { nftUri: HexString }
      >
    ): Promise<TestContractResult<HexString>> => {
      return testMethod(this, "mint", params);
    },
    withdraw: async (
      params: TestContractParams<
        NFTOpenCollectionWithRoyaltyTypes.Fields,
        { to: Address; amount: bigint }
      >
    ): Promise<TestContractResult<null>> => {
      return testMethod(this, "withdraw", params);
    },
  };
}

// Use this object to test and deploy the contract
export const NFTOpenCollectionWithRoyalty = new Factory(
  Contract.fromJson(
    NFTOpenCollectionWithRoyaltyContractJson,
    "",
    "44b011881d3855e781a7bfc33fc66bf745a8df182eaa91600d6f3ec3275c92c7"
  )
);

// Use this class to interact with the blockchain
export class NFTOpenCollectionWithRoyaltyInstance extends ContractInstance {
  constructor(address: Address) {
    super(address);
  }

  async fetchState(): Promise<NFTOpenCollectionWithRoyaltyTypes.State> {
    return fetchContractState(NFTOpenCollectionWithRoyalty, this);
  }

  async getContractEventsCurrentCount(): Promise<number> {
    return getContractEventsCurrentCount(this.address);
  }

  subscribeMintEvent(
    options: EventSubscribeOptions<NFTOpenCollectionWithRoyaltyTypes.MintEvent>,
    fromCount?: number
  ): EventSubscription {
    return subscribeContractEvent(
      NFTOpenCollectionWithRoyalty.contract,
      this,
      options,
      "Mint",
      fromCount
    );
  }

  methods = {
    getCollectionUri: async (
      params?: NFTOpenCollectionWithRoyaltyTypes.CallMethodParams<"getCollectionUri">
    ): Promise<
      NFTOpenCollectionWithRoyaltyTypes.CallMethodResult<"getCollectionUri">
    > => {
      return callMethod(
        NFTOpenCollectionWithRoyalty,
        this,
        "getCollectionUri",
        params === undefined ? {} : params,
        getContractByCodeHash
      );
    },
    totalSupply: async (
      params?: NFTOpenCollectionWithRoyaltyTypes.CallMethodParams<"totalSupply">
    ): Promise<
      NFTOpenCollectionWithRoyaltyTypes.CallMethodResult<"totalSupply">
    > => {
      return callMethod(
        NFTOpenCollectionWithRoyalty,
        this,
        "totalSupply",
        params === undefined ? {} : params,
        getContractByCodeHash
      );
    },
    nftByIndex: async (
      params: NFTOpenCollectionWithRoyaltyTypes.CallMethodParams<"nftByIndex">
    ): Promise<
      NFTOpenCollectionWithRoyaltyTypes.CallMethodResult<"nftByIndex">
    > => {
      return callMethod(
        NFTOpenCollectionWithRoyalty,
        this,
        "nftByIndex",
        params,
        getContractByCodeHash
      );
    },
    royaltyAmount: async (
      params: NFTOpenCollectionWithRoyaltyTypes.CallMethodParams<"royaltyAmount">
    ): Promise<
      NFTOpenCollectionWithRoyaltyTypes.CallMethodResult<"royaltyAmount">
    > => {
      return callMethod(
        NFTOpenCollectionWithRoyalty,
        this,
        "royaltyAmount",
        params,
        getContractByCodeHash
      );
    },
    mint: async (
      params: NFTOpenCollectionWithRoyaltyTypes.CallMethodParams<"mint">
    ): Promise<NFTOpenCollectionWithRoyaltyTypes.CallMethodResult<"mint">> => {
      return callMethod(
        NFTOpenCollectionWithRoyalty,
        this,
        "mint",
        params,
        getContractByCodeHash
      );
    },
  };

  async multicall<
    Calls extends NFTOpenCollectionWithRoyaltyTypes.MultiCallParams
  >(
    calls: Calls
  ): Promise<NFTOpenCollectionWithRoyaltyTypes.MultiCallResults<Calls>> {
    return (await multicallMethods(
      NFTOpenCollectionWithRoyalty,
      this,
      calls,
      getContractByCodeHash
    )) as NFTOpenCollectionWithRoyaltyTypes.MultiCallResults<Calls>;
  }
}
