/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { RunScriptResult, DeployContractExecutionResult } from "@alephium/cli";
import { NetworkId } from "@alephium/web3";
import {
  NFTListing,
  NFTListingInstance,
  NFTMarketPlace,
  NFTMarketPlaceInstance,
  EnumerableNFT,
  EnumerableNFTInstance,
  NonEnumerableNFT,
  NonEnumerableNFTInstance,
} from ".";
import { default as devnetDeployments } from "../.deployments.devnet.json";

export type Deployments = {
  deployerAddress: string;
  contracts: {
    NFTListing: DeployContractExecutionResult<NFTListingInstance>;
    NFTMarketPlace: DeployContractExecutionResult<NFTMarketPlaceInstance>;
    EnumerableNFT: DeployContractExecutionResult<EnumerableNFTInstance>;
    NonEnumerableNFT: DeployContractExecutionResult<NonEnumerableNFTInstance>;
  };
};

function toDeployments(json: any): Deployments {
  const contracts = {
    NFTListing: {
      ...json.contracts.NFTListing,
      contractInstance: NFTListing.at(
        json.contracts.NFTListing.contractInstance.address
      ),
    },
    NFTMarketPlace: {
      ...json.contracts.NFTMarketPlace,
      contractInstance: NFTMarketPlace.at(
        json.contracts.NFTMarketPlace.contractInstance.address
      ),
    },
    EnumerableNFT: {
      ...json.contracts.EnumerableNFT,
      contractInstance: EnumerableNFT.at(
        json.contracts.EnumerableNFT.contractInstance.address
      ),
    },
    NonEnumerableNFT: {
      ...json.contracts.NonEnumerableNFT,
      contractInstance: NonEnumerableNFT.at(
        json.contracts.NonEnumerableNFT.contractInstance.address
      ),
    },
  };
  return {
    ...json,
    contracts: contracts as Deployments["contracts"],
  };
}

export function loadDeployments(
  networkId: NetworkId,
  deployerAddress?: string
): Deployments {
  const deployments = networkId === "devnet" ? devnetDeployments : undefined;
  if (deployments === undefined) {
    throw Error("The contract has not been deployed to the " + networkId);
  }
  const allDeployments = Array.isArray(deployments)
    ? deployments
    : [deployments];
  if (deployerAddress === undefined) {
    if (allDeployments.length > 1) {
      throw Error(
        "The contract has been deployed multiple times on " +
          networkId +
          ", please specify the deployer address"
      );
    } else {
      return toDeployments(allDeployments[0]);
    }
  }
  const result = allDeployments.find(
    (d) => d.deployerAddress === deployerAddress
  );
  if (result === undefined) {
    throw Error("The contract deployment result does not exist");
  }
  return toDeployments(result);
}
