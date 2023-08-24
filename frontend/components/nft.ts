import axios from "axios"
import useSWR from "swr"
import { NFTPublicSaleCollectionSequentialInstance } from '../../artifacts/ts'
import { web3, hexToString, addressFromContractId, NodeProvider, subContractId, binToHex, encodeU256 } from "@alephium/web3"
import { fetchNFTListingsByOwner } from "./NFTListing"
import { fetchMintedNFT, fetchMintedNFTByMetadata, fetchMintedNFTMetadata, NFT } from "../../shared/nft"

export async function fetchPreMintNFT(
  collectionId: string,
  tokenIndex: bigint,
  mintPrice?: bigint,
): Promise<NFT | undefined> {
  const tokenId = subContractId(collectionId, binToHex(encodeU256(tokenIndex)), 0)
  try {
    const collectionAddress = addressFromContractId(collectionId)
    const collection = new NFTPublicSaleCollectionSequentialInstance(collectionAddress)
    const tokenUri = hexToString((await collection.methods.getNFTUri({ args: { index: tokenIndex } })).returns)
    if (mintPrice === undefined) {
      mintPrice = (await collection.methods.getMintPrice()).returns
    }
    const metadata = (await axios.get(tokenUri)).data
    return {
      name: metadata.name,
      description: metadata.description,
      image: metadata.image,
      tokenId: tokenId,
      collectionId: collectionId,
      listed: false,
      minted: false,
      price: mintPrice,
      tokenIndex: Number(tokenIndex)
    }
  } catch (e) {
    console.error(`error fetching information for pre mint NFT ${tokenId}`, e)
    return undefined
  }
}

async function fetchListedNFTs(address: string): Promise<NFT[]> {
  const listings = await fetchNFTListingsByOwner(address)
  return listings.map((listing) => ({ tokenId: listing._id, listed: true, minted: true, ...listing }))
}

async function fetchNFTsFromUTXOs(
  nodeProvider: NodeProvider,
  address: string
): Promise<NFT[]> {
  const balances = await nodeProvider.addresses.getAddressesAddressBalance(address, { mempool: false })
  const tokenBalances = balances.tokenBalances !== undefined ? balances.tokenBalances : []
  const tokenIds = tokenBalances
    .filter((token) => +token.amount == 1)
    .map((token) => token.id)

  const nftMetadataPromises = tokenIds.map((tokenId) => fetchMintedNFTMetadata(nodeProvider, tokenId))
  const nftMetadatas = await Promise.all(nftMetadataPromises)
  const nftPromises = tokenIds.map((tokenId, index) => {
    const metadata = nftMetadatas[index]
    if (metadata === undefined) return Promise.resolve(undefined)
    return fetchMintedNFTByMetadata(tokenId, metadata, false)
  })
  return (await Promise.all(nftPromises)).filter((nft) => nft !== undefined) as NFT[]
}

export async function fetchNFTsByAddress(nodeProvider: NodeProvider, address: string): Promise<NFT[]> {
  web3.setCurrentNodeProvider(nodeProvider)
  const nftsFromUTXOs = await fetchNFTsFromUTXOs(nodeProvider, address)
  const listedNFTs = await fetchListedNFTs(address)

  const isListed = (nftTokenId: string) => listedNFTs.find((nft) => nft.tokenId === nftTokenId) !== undefined
  const removeDuplicates = nftsFromUTXOs.filter((nft) => !isListed(nft.tokenId))
  return [...removeDuplicates, ...listedNFTs]
}

export const useNFT = (
  tokenId: string,
  listed: boolean,
  nodeProvider?: NodeProvider
) => {
  const { data, error, ...rest } = useSWR(
    nodeProvider &&
    [
      tokenId,
      "nft",
    ],
    async () => {
      if (!nodeProvider) {
        return undefined;
      }

      web3.setCurrentNodeProvider(nodeProvider)

      return await fetchMintedNFT(nodeProvider, tokenId, listed)
    },
    {
      refreshInterval: 60e3 /* 1 minute */,
      suspense: true
    },
  )

  return { nft: data, isLoading: !data && !error, ...rest }
}