import * as web3 from '@alephium/web3'
import { DeployHelpers } from './deploy-helpers'
import { NFT, NFTOpenCollection, NFTOpenCollectionInstance, NFTPreDesignedCollection, NFTPreDesignedCollectionInstance } from '../artifacts/ts'
import { MintOpenNFT, MintPreDesignedNFT } from '../artifacts/ts/scripts'
import { DeployContractResult, ONE_ALPH } from '@alephium/web3'
import { nftTemplateId } from '../configs/nft'

export class NFTCollection extends DeployHelpers {
  defaultNFTCollectionId: string = "0".repeat(64)
  nftTemplateId: string | undefined = undefined

  async createOpenCollection(
    collectionUri: string
  ): Promise<DeployContractResult<NFTOpenCollectionInstance>> {

    const nftCollectionDeployTx = await NFTOpenCollection.deploy(
      this.signer,
      {
        initialFields: {
          nftTemplateId,
          uri: web3.stringToHex(collectionUri),
          totalSupply: 0n
        }
      }
    )

    return nftCollectionDeployTx
  }

  async createPreDesignedCollection(
    collectionUri: string,
    baseUri: string
  ): Promise<DeployContractResult<NFTPreDesignedCollectionInstance>> {

    const nftTemplateId = await this.createNFTTemplate()
    const nftCollectionDeployTx = await NFTPreDesignedCollection.deploy(
      this.signer,
      {
        initialFields: {
          nftTemplateId,
          uri: web3.stringToHex(collectionUri),
          baseUri: web3.stringToHex(baseUri),
          totalSupply: 0n
        }
      }
    )

    return nftCollectionDeployTx
  }

  async createNFTTemplate() {
    if (!!this.nftTemplateId) {
      return Promise.resolve(this.nftTemplateId)
    }

    const nftDeployResult = await NFT.deploy(
      this.signer,
      {
        initialFields: {
          collectionId: web3.stringToHex("collection_id"),
          uri: web3.stringToHex("template_uri")
        }
      }
    )

    this.nftTemplateId = nftDeployResult.contractId
    return this.nftTemplateId
  }

  async mintOpenNFT(
    nftCollectionContractId: string,
    nftUri: string,
  ) {
    return await MintOpenNFT.execute(
      this.signer,
      {
        initialFields: {
          nftCollectionContractId: nftCollectionContractId,
          uri: web3.stringToHex(nftUri)
        },
        attoAlphAmount: BigInt(1.1e18)
      }
    )
  }

  async mintPreDesignedNFT(
    nftCollectionContractId: string,
  ) {
    return await MintPreDesignedNFT.execute(
      this.signer,
      {
        initialFields: {
          nftCollectionContractId: nftCollectionContractId
        },
        attoAlphAmount: BigInt(1.1e18)
      }
    )
  }
}
