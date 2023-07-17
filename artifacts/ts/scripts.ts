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
import { default as BuyNFTScriptJson } from "../scripts/BuyNFT.ral.json";
import { default as CancelListingScriptJson } from "../scripts/CancelListing.ral.json";
import { default as ListNFTScriptJson } from "../scripts/ListNFT.ral.json";
import { default as MintOpenNFTScriptJson } from "../scripts/MintOpenNFT.ral.json";
import { default as MintSpecificPublicSaleNFTScriptJson } from "../scripts/MintSpecificPublicSaleNFT.ral.json";
import { default as UpdateAdminScriptJson } from "../scripts/UpdateAdmin.ral.json";
import { default as UpdateComissionRateScriptJson } from "../scripts/UpdateComissionRate.ral.json";
import { default as UpdateListingFeeScriptJson } from "../scripts/UpdateListingFee.ral.json";
import { default as UpdateNFTPriceScriptJson } from "../scripts/UpdateNFTPrice.ral.json";
import { default as WithdrawFromMarketPlaceScriptJson } from "../scripts/WithdrawFromMarketPlace.ral.json";
import { default as WithdrawFromPublicSaleCollectionScriptJson } from "../scripts/WithdrawFromPublicSaleCollection.ral.json";

export const BuyNFT = new ExecutableScript<{
  totalPayment: bigint;
  tokenId: HexString;
  nftMarketplace: HexString;
}>(Script.fromJson(BuyNFTScriptJson));
export const CancelListing = new ExecutableScript<{
  tokenId: HexString;
  nftMarketplace: HexString;
}>(Script.fromJson(CancelListingScriptJson));
export const ListNFT = new ExecutableScript<{
  tokenId: HexString;
  price: bigint;
  nftMarketplace: HexString;
}>(Script.fromJson(ListNFTScriptJson));
export const MintOpenNFT = new ExecutableScript<{
  nftCollection: HexString;
  uri: HexString;
}>(Script.fromJson(MintOpenNFTScriptJson));
export const MintSpecificPublicSaleNFT = new ExecutableScript<{
  index: bigint;
  mintPrice: bigint;
  nftCollection: HexString;
}>(Script.fromJson(MintSpecificPublicSaleNFTScriptJson));
export const UpdateAdmin = new ExecutableScript<{
  newAdmin: Address;
  nftMarketplace: HexString;
}>(Script.fromJson(UpdateAdminScriptJson));
export const UpdateComissionRate = new ExecutableScript<{
  newCommissionRate: bigint;
  nftMarketplace: HexString;
}>(Script.fromJson(UpdateComissionRateScriptJson));
export const UpdateListingFee = new ExecutableScript<{
  price: bigint;
  nftMarketplace: HexString;
}>(Script.fromJson(UpdateListingFeeScriptJson));
export const UpdateNFTPrice = new ExecutableScript<{
  price: bigint;
  tokenId: HexString;
  nftMarketplace: HexString;
}>(Script.fromJson(UpdateNFTPriceScriptJson));
export const WithdrawFromMarketPlace = new ExecutableScript<{
  to: Address;
  amount: bigint;
  nftMarketplace: HexString;
}>(Script.fromJson(WithdrawFromMarketPlaceScriptJson));
export const WithdrawFromPublicSaleCollection = new ExecutableScript<{
  to: Address;
  amount: bigint;
  nftCollection: HexString;
}>(Script.fromJson(WithdrawFromPublicSaleCollectionScriptJson));
