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
import { default as NFTMarketPlaceContractJson } from "../marketplace/NFTMarketPlace.ral.json";
import { getContractByCodeHash } from "./contracts";

// Custom types for the contract
export namespace NFTMarketPlaceTypes {
  export type Fields = {
    nftListingTemplateId: HexString;
    admin: Address;
    commissionRate: bigint;
  };

  export type State = ContractState<Fields>;

  export type NFTListedEvent = ContractEvent<{
    price: bigint;
    tokenId: HexString;
    tokenOwner: Address;
    listingContractId: HexString;
  }>;
  export type NFTSoldEvent = ContractEvent<{
    price: bigint;
    tokenId: HexString;
    previousOwner: Address;
    newOwner: Address;
  }>;
  export type NFTListingCancelledEvent = ContractEvent<{
    tokenId: HexString;
    tokenOwner: Address;
  }>;
  export type NFTListingPriceUpdatedEvent = ContractEvent<{
    tokenId: HexString;
    oldPrice: bigint;
    newPrice: bigint;
  }>;
  export type AdminUpdatedEvent = ContractEvent<{
    previous: Address;
    new: Address;
  }>;
  export type CommissionRateUpdatedEvent = ContractEvent<{
    previous: bigint;
    new: bigint;
  }>;

  export interface CallMethodTable {
    getPriceAfterFee: {
      params: CallContractParams<{
        priceIn: bigint;
        commissionRateIn: bigint;
        royaltyAmount: bigint;
      }>;
      result: CallContractResult<bigint>;
    };
    getRoyaltyAmount: {
      params: CallContractParams<{
        tokenIdIn: HexString;
        collectionId: HexString;
        priceIn: bigint;
        requiresRoyalty: boolean;
      }>;
      result: CallContractResult<bigint>;
    };
    listNFT: {
      params: CallContractParams<{
        tokenId: HexString;
        collectionId: HexString;
        price: bigint;
        royalty: boolean;
      }>;
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
  NFTMarketPlaceInstance,
  NFTMarketPlaceTypes.Fields
> {
  getInitialFieldsWithDefaultValues() {
    return this.contract.getInitialFieldsWithDefaultValues() as NFTMarketPlaceTypes.Fields;
  }

  eventIndex = {
    NFTListed: 0,
    NFTSold: 1,
    NFTListingCancelled: 2,
    NFTListingPriceUpdated: 3,
    AdminUpdated: 4,
    CommissionRateUpdated: 5,
  };
  consts = {
    ErrorCodes: {
      NFTPriceTooLow: BigInt(2),
      AdminAllowedOnly: BigInt(0),
      TokenOwnerAllowedOnly: BigInt(1),
    },
  };

  at(address: string): NFTMarketPlaceInstance {
    return new NFTMarketPlaceInstance(address);
  }

  tests = {
    getPriceAfterFee: async (
      params: TestContractParams<
        NFTMarketPlaceTypes.Fields,
        { priceIn: bigint; commissionRateIn: bigint; royaltyAmount: bigint }
      >
    ): Promise<TestContractResult<bigint>> => {
      return testMethod(this, "getPriceAfterFee", params);
    },
    getRoyaltyAmount: async (
      params: TestContractParams<
        NFTMarketPlaceTypes.Fields,
        {
          tokenIdIn: HexString;
          collectionId: HexString;
          priceIn: bigint;
          requiresRoyalty: boolean;
        }
      >
    ): Promise<TestContractResult<bigint>> => {
      return testMethod(this, "getRoyaltyAmount", params);
    },
    buyNFT: async (
      params: TestContractParams<
        NFTMarketPlaceTypes.Fields,
        { tokenId: HexString; collectionId: HexString }
      >
    ): Promise<TestContractResult<null>> => {
      return testMethod(this, "buyNFT", params);
    },
    listNFT: async (
      params: TestContractParams<
        NFTMarketPlaceTypes.Fields,
        {
          tokenId: HexString;
          collectionId: HexString;
          price: bigint;
          royalty: boolean;
        }
      >
    ): Promise<TestContractResult<Address>> => {
      return testMethod(this, "listNFT", params);
    },
    cancelNFTListing: async (
      params: TestContractParams<
        NFTMarketPlaceTypes.Fields,
        { tokenId: HexString }
      >
    ): Promise<TestContractResult<null>> => {
      return testMethod(this, "cancelNFTListing", params);
    },
    updateNFTPrice: async (
      params: TestContractParams<
        NFTMarketPlaceTypes.Fields,
        { tokenId: HexString; collectionId: HexString; newPrice: bigint }
      >
    ): Promise<TestContractResult<null>> => {
      return testMethod(this, "updateNFTPrice", params);
    },
    updateAdmin: async (
      params: TestContractParams<
        NFTMarketPlaceTypes.Fields,
        { newAdmin: Address }
      >
    ): Promise<TestContractResult<null>> => {
      return testMethod(this, "updateAdmin", params);
    },
    updateCommissionRate: async (
      params: TestContractParams<
        NFTMarketPlaceTypes.Fields,
        { newCommissionRate: bigint }
      >
    ): Promise<TestContractResult<null>> => {
      return testMethod(this, "updateCommissionRate", params);
    },
    withdraw: async (
      params: TestContractParams<
        NFTMarketPlaceTypes.Fields,
        { to: Address; amount: bigint }
      >
    ): Promise<TestContractResult<null>> => {
      return testMethod(this, "withdraw", params);
    },
  };
}

// Use this object to test and deploy the contract
export const NFTMarketPlace = new Factory(
  Contract.fromJson(
    NFTMarketPlaceContractJson,
    "",
    "4cdedee37f8cb9ea04e581d783b7fa19a9c3eca5b7cffa1df1af8ec8f0820f9e"
  )
);

// Use this class to interact with the blockchain
export class NFTMarketPlaceInstance extends ContractInstance {
  constructor(address: Address) {
    super(address);
  }

  async fetchState(): Promise<NFTMarketPlaceTypes.State> {
    return fetchContractState(NFTMarketPlace, this);
  }

  async getContractEventsCurrentCount(): Promise<number> {
    return getContractEventsCurrentCount(this.address);
  }

  subscribeNFTListedEvent(
    options: EventSubscribeOptions<NFTMarketPlaceTypes.NFTListedEvent>,
    fromCount?: number
  ): EventSubscription {
    return subscribeContractEvent(
      NFTMarketPlace.contract,
      this,
      options,
      "NFTListed",
      fromCount
    );
  }

  subscribeNFTSoldEvent(
    options: EventSubscribeOptions<NFTMarketPlaceTypes.NFTSoldEvent>,
    fromCount?: number
  ): EventSubscription {
    return subscribeContractEvent(
      NFTMarketPlace.contract,
      this,
      options,
      "NFTSold",
      fromCount
    );
  }

  subscribeNFTListingCancelledEvent(
    options: EventSubscribeOptions<NFTMarketPlaceTypes.NFTListingCancelledEvent>,
    fromCount?: number
  ): EventSubscription {
    return subscribeContractEvent(
      NFTMarketPlace.contract,
      this,
      options,
      "NFTListingCancelled",
      fromCount
    );
  }

  subscribeNFTListingPriceUpdatedEvent(
    options: EventSubscribeOptions<NFTMarketPlaceTypes.NFTListingPriceUpdatedEvent>,
    fromCount?: number
  ): EventSubscription {
    return subscribeContractEvent(
      NFTMarketPlace.contract,
      this,
      options,
      "NFTListingPriceUpdated",
      fromCount
    );
  }

  subscribeAdminUpdatedEvent(
    options: EventSubscribeOptions<NFTMarketPlaceTypes.AdminUpdatedEvent>,
    fromCount?: number
  ): EventSubscription {
    return subscribeContractEvent(
      NFTMarketPlace.contract,
      this,
      options,
      "AdminUpdated",
      fromCount
    );
  }

  subscribeCommissionRateUpdatedEvent(
    options: EventSubscribeOptions<NFTMarketPlaceTypes.CommissionRateUpdatedEvent>,
    fromCount?: number
  ): EventSubscription {
    return subscribeContractEvent(
      NFTMarketPlace.contract,
      this,
      options,
      "CommissionRateUpdated",
      fromCount
    );
  }

  subscribeAllEvents(
    options: EventSubscribeOptions<
      | NFTMarketPlaceTypes.NFTListedEvent
      | NFTMarketPlaceTypes.NFTSoldEvent
      | NFTMarketPlaceTypes.NFTListingCancelledEvent
      | NFTMarketPlaceTypes.NFTListingPriceUpdatedEvent
      | NFTMarketPlaceTypes.AdminUpdatedEvent
      | NFTMarketPlaceTypes.CommissionRateUpdatedEvent
    >,
    fromCount?: number
  ): EventSubscription {
    return subscribeContractEvents(
      NFTMarketPlace.contract,
      this,
      options,
      fromCount
    );
  }

  methods = {
    getPriceAfterFee: async (
      params: NFTMarketPlaceTypes.CallMethodParams<"getPriceAfterFee">
    ): Promise<NFTMarketPlaceTypes.CallMethodResult<"getPriceAfterFee">> => {
      return callMethod(
        NFTMarketPlace,
        this,
        "getPriceAfterFee",
        params,
        getContractByCodeHash
      );
    },
    getRoyaltyAmount: async (
      params: NFTMarketPlaceTypes.CallMethodParams<"getRoyaltyAmount">
    ): Promise<NFTMarketPlaceTypes.CallMethodResult<"getRoyaltyAmount">> => {
      return callMethod(
        NFTMarketPlace,
        this,
        "getRoyaltyAmount",
        params,
        getContractByCodeHash
      );
    },
    listNFT: async (
      params: NFTMarketPlaceTypes.CallMethodParams<"listNFT">
    ): Promise<NFTMarketPlaceTypes.CallMethodResult<"listNFT">> => {
      return callMethod(
        NFTMarketPlace,
        this,
        "listNFT",
        params,
        getContractByCodeHash
      );
    },
  };

  async multicall<Calls extends NFTMarketPlaceTypes.MultiCallParams>(
    calls: Calls
  ): Promise<NFTMarketPlaceTypes.MultiCallResults<Calls>> {
    return (await multicallMethods(
      NFTMarketPlace,
      this,
      calls,
      getContractByCodeHash
    )) as NFTMarketPlaceTypes.MultiCallResults<Calls>;
  }
}
