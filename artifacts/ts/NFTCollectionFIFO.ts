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
  fetchContractState,
  ContractInstance,
  getContractEventsCurrentCount,
} from "@alephium/web3";
import { default as NFTCollectionFIFOContractJson } from "../nft/nft_collection_fifo.ral.json";

// Custom types for the contract
export namespace NFTCollectionFIFOTypes {
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
}

class Factory extends ContractFactory<
  NFTCollectionFIFOInstance,
  NFTCollectionFIFOTypes.Fields
> {
  at(address: string): NFTCollectionFIFOInstance {
    return new NFTCollectionFIFOInstance(address);
  }

  async testGetNameMethod(
    params: Omit<
      TestContractParams<NFTCollectionFIFOTypes.Fields, never>,
      "testArgs"
    >
  ): Promise<TestContractResult<HexString>> {
    return testMethod(this, "getName", params);
  }

  async testGetSymbolMethod(
    params: Omit<
      TestContractParams<NFTCollectionFIFOTypes.Fields, never>,
      "testArgs"
    >
  ): Promise<TestContractResult<HexString>> {
    return testMethod(this, "getSymbol", params);
  }

  async testTotalSupplyMethod(
    params: Omit<
      TestContractParams<NFTCollectionFIFOTypes.Fields, never>,
      "testArgs"
    >
  ): Promise<TestContractResult<bigint>> {
    return testMethod(this, "totalSupply", params);
  }

  async testNftByIndexMethod(
    params: TestContractParams<NFTCollectionFIFOTypes.Fields, { index: bigint }>
  ): Promise<TestContractResult<[HexString, boolean]>> {
    return testMethod(this, "nftByIndex", params);
  }

  async testMintMethod(
    params: TestContractParams<
      NFTCollectionFIFOTypes.Fields,
      { nftUri: HexString }
    >
  ): Promise<TestContractResult<HexString>> {
    return testMethod(this, "mint", params);
  }
}

// Use this object to test and deploy the contract
export const NFTCollectionFIFO = new Factory(
  Contract.fromJson(
    NFTCollectionFIFOContractJson,
    "",
    "5616b72221cdcc946b18dfd39711e5be2ab91e0cd460745abcca4b8cf5d58b82"
  )
);

// Use this class to interact with the blockchain
export class NFTCollectionFIFOInstance extends ContractInstance {
  constructor(address: Address) {
    super(address);
  }

  async fetchState(): Promise<NFTCollectionFIFOTypes.State> {
    return fetchContractState(NFTCollectionFIFO, this);
  }

  async getContractEventsCurrentCount(): Promise<number> {
    return getContractEventsCurrentCount(this.address);
  }

  subscribeMintedEvent(
    options: SubscribeOptions<NFTCollectionFIFOTypes.MintedEvent>,
    fromCount?: number
  ): EventSubscription {
    return subscribeContractEvent(
      NFTCollectionFIFO.contract,
      this,
      options,
      "Minted",
      fromCount
    );
  }

  async callGetNameMethod(
    params?: Omit<CallContractParams<{}>, "args">
  ): Promise<CallContractResult<HexString>> {
    return callMethod(
      NFTCollectionFIFO,
      this,
      "getName",
      params === undefined ? {} : params
    );
  }

  async callGetSymbolMethod(
    params?: Omit<CallContractParams<{}>, "args">
  ): Promise<CallContractResult<HexString>> {
    return callMethod(
      NFTCollectionFIFO,
      this,
      "getSymbol",
      params === undefined ? {} : params
    );
  }

  async callTotalSupplyMethod(
    params?: Omit<CallContractParams<{}>, "args">
  ): Promise<CallContractResult<bigint>> {
    return callMethod(
      NFTCollectionFIFO,
      this,
      "totalSupply",
      params === undefined ? {} : params
    );
  }

  async callNftByIndexMethod(
    params: CallContractParams<{ index: bigint }>
  ): Promise<CallContractResult<[HexString, boolean]>> {
    return callMethod(NFTCollectionFIFO, this, "nftByIndex", params);
  }

  async callMintMethod(
    params: CallContractParams<{ nftUri: HexString }>
  ): Promise<CallContractResult<HexString>> {
    return callMethod(NFTCollectionFIFO, this, "mint", params);
  }
}
