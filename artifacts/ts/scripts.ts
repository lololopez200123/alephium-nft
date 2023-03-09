/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ExecuteScriptParams,
  ExecuteScriptResult,
  Script,
  SignerProvider,
  HexString,
} from "@alephium/web3";
import { default as BurnNFTScriptJson } from "../scripts/burn_nft.ral.json";
import { default as BuyNFTScriptJson } from "../scripts/buy_nft.ral.json";
import { default as CancelListingScriptJson } from "../scripts/cancel_listing.ral.json";
import { default as DepositNFTScriptJson } from "../scripts/deposit_nft.ral.json";
import { default as ListNFTScriptJson } from "../scripts/list_nft.ral.json";
import { default as MintNFTWithIndexScriptJson } from "../scripts/mint_nft_with_index.ral.json";
import { default as MintOpenNFTScriptJson } from "../scripts/mint_open_nft.ral.json";
import { default as UpdateAdminScriptJson } from "../scripts/update_admin.ral.json";
import { default as UpdateComissionRateScriptJson } from "../scripts/update_commission_rate.ral.json";
import { default as UpdateListingFeeScriptJson } from "../scripts/update_listing_fee.ral.json";
import { default as UpdateNFTPriceScriptJson } from "../scripts/update_nft_price.ral.json";
import { default as WithdrawNFTScriptJson } from "../scripts/withdraw_nft.ral.json";

export namespace BurnNFT {
  export async function execute(
    signer: SignerProvider,
    params: ExecuteScriptParams<{ nftContractId: HexString }>
  ): Promise<ExecuteScriptResult> {
    const signerParams = await script.txParamsForExecution(signer, params);
    return await signer.signAndSubmitExecuteScriptTx(signerParams);
  }

  export const script = Script.fromJson(BurnNFTScriptJson);
}

export namespace BuyNFT {
  export async function execute(
    signer: SignerProvider,
    params: ExecuteScriptParams<{
      totalPayment: bigint;
      tokenId: HexString;
      nftMarketplaceContractId: HexString;
    }>
  ): Promise<ExecuteScriptResult> {
    const signerParams = await script.txParamsForExecution(signer, params);
    return await signer.signAndSubmitExecuteScriptTx(signerParams);
  }

  export const script = Script.fromJson(BuyNFTScriptJson);
}

export namespace CancelListing {
  export async function execute(
    signer: SignerProvider,
    params: ExecuteScriptParams<{
      tokenId: HexString;
      nftMarketplaceContractId: HexString;
    }>
  ): Promise<ExecuteScriptResult> {
    const signerParams = await script.txParamsForExecution(signer, params);
    return await signer.signAndSubmitExecuteScriptTx(signerParams);
  }

  export const script = Script.fromJson(CancelListingScriptJson);
}

export namespace DepositNFT {
  export async function execute(
    signer: SignerProvider,
    params: ExecuteScriptParams<{ nftContractId: HexString }>
  ): Promise<ExecuteScriptResult> {
    const signerParams = await script.txParamsForExecution(signer, params);
    return await signer.signAndSubmitExecuteScriptTx(signerParams);
  }

  export const script = Script.fromJson(DepositNFTScriptJson);
}

export namespace ListNFT {
  export async function execute(
    signer: SignerProvider,
    params: ExecuteScriptParams<{
      tokenId: HexString;
      price: bigint;
      marketPlaceContractId: HexString;
    }>
  ): Promise<ExecuteScriptResult> {
    const signerParams = await script.txParamsForExecution(signer, params);
    return await signer.signAndSubmitExecuteScriptTx(signerParams);
  }

  export const script = Script.fromJson(ListNFTScriptJson);
}

export namespace MintNFTWithIndex {
  export async function execute(
    signer: SignerProvider,
    params: ExecuteScriptParams<{
      nftCollectionContractId: HexString;
      uri: HexString;
      tokenIndex: bigint;
    }>
  ): Promise<ExecuteScriptResult> {
    const signerParams = await script.txParamsForExecution(signer, params);
    return await signer.signAndSubmitExecuteScriptTx(signerParams);
  }

  export const script = Script.fromJson(MintNFTWithIndexScriptJson);
}

export namespace MintOpenNFT {
  export async function execute(
    signer: SignerProvider,
    params: ExecuteScriptParams<{
      nftCollectionContractId: HexString;
      uri: HexString;
    }>
  ): Promise<ExecuteScriptResult> {
    const signerParams = await script.txParamsForExecution(signer, params);
    return await signer.signAndSubmitExecuteScriptTx(signerParams);
  }

  export const script = Script.fromJson(MintOpenNFTScriptJson);
}

export namespace UpdateAdmin {
  export async function execute(
    signer: SignerProvider,
    params: ExecuteScriptParams<{
      newAdmin: HexString;
      nftMarketplaceContractId: HexString;
    }>
  ): Promise<ExecuteScriptResult> {
    const signerParams = await script.txParamsForExecution(signer, params);
    return await signer.signAndSubmitExecuteScriptTx(signerParams);
  }

  export const script = Script.fromJson(UpdateAdminScriptJson);
}

export namespace UpdateComissionRate {
  export async function execute(
    signer: SignerProvider,
    params: ExecuteScriptParams<{
      newCommissionRate: bigint;
      nftMarketplaceContractId: HexString;
    }>
  ): Promise<ExecuteScriptResult> {
    const signerParams = await script.txParamsForExecution(signer, params);
    return await signer.signAndSubmitExecuteScriptTx(signerParams);
  }

  export const script = Script.fromJson(UpdateComissionRateScriptJson);
}

export namespace UpdateListingFee {
  export async function execute(
    signer: SignerProvider,
    params: ExecuteScriptParams<{
      price: bigint;
      nftMarketplaceContractId: HexString;
    }>
  ): Promise<ExecuteScriptResult> {
    const signerParams = await script.txParamsForExecution(signer, params);
    return await signer.signAndSubmitExecuteScriptTx(signerParams);
  }

  export const script = Script.fromJson(UpdateListingFeeScriptJson);
}

export namespace UpdateNFTPrice {
  export async function execute(
    signer: SignerProvider,
    params: ExecuteScriptParams<{
      price: bigint;
      tokenId: HexString;
      nftMarketplaceContractId: HexString;
    }>
  ): Promise<ExecuteScriptResult> {
    const signerParams = await script.txParamsForExecution(signer, params);
    return await signer.signAndSubmitExecuteScriptTx(signerParams);
  }

  export const script = Script.fromJson(UpdateNFTPriceScriptJson);
}

export namespace WithdrawNFT {
  export async function execute(
    signer: SignerProvider,
    params: ExecuteScriptParams<{ nftContractId: HexString }>
  ): Promise<ExecuteScriptResult> {
    const signerParams = await script.txParamsForExecution(signer, params);
    return await signer.signAndSubmitExecuteScriptTx(signerParams);
  }

  export const script = Script.fromJson(WithdrawNFTScriptJson);
}
