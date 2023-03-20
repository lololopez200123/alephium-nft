import { web3, hexToString, node, ONE_ALPH, SignerProvider } from '@alephium/web3'
import { useEffect, useState } from 'react'
import { fetchNFTState } from '../utils/contracts'
import { NFT as NFTFactory } from '../artifacts/ts'
import { addressFromContractId } from '@alephium/web3'
import { NFTMarketplace } from '../utils/nft-marketplace'
import { NFTCollection } from '../utils/nft-collection'
import { marketplaceContractId } from '../configs/nft'
import axios from 'axios'
import TxStatusAlert, { useTxStatusStates } from './tx-status-alert'
import { useContext } from '@alephium/web3-react'
import { fetchNFTListings } from '../components/nft-listing'

interface NFT {
  name: string,
  description: string,
  image: string,
  tokenId: string,
  listed: boolean
}

export default function Home() {
  const [nfts, setNfts] = useState([] as NFT[])
  const [nftBeingSold, setNftBeingSold] = useState<NFT | undefined>(undefined)
  const [nftSellingPrice, setNftSellingPrice] = useState<number | undefined>(undefined)
  const [loadingState, setLoadingState] = useState('not-loaded')
  const context = useContext()
  const [showSetPriceModal, setShowSetPriceModal] = useState(false);
  const minimumNFTPrice = 0.0001 // ALPH

  const [
    ongoingTxId,
    setOngoingTxId,
    ongoingTxDescription,
    setOngoingTxDescription,
    txStatusCallback,
    setTxStatusCallback,
    resetTxStatus
  ] = useTxStatusStates()

  console.debug('selected account in my-nft', context.account)

  useEffect(() => {
    loadNFTs()
  }, [context.account])

  function resetState() {
    resetTxStatus()
    setNftBeingSold(undefined)
    setNftSellingPrice(undefined)
  }

  async function loadNFT(tokenId: string, listed: boolean): Promise<NFT | undefined> {
    var nftState = undefined

    if (context.signerProvider?.nodeProvider) {
      try {
        web3.setCurrentNodeProvider(context.signerProvider.nodeProvider)
        nftState = await fetchNFTState(
          addressFromContractId(tokenId)
        )
      } catch (e) {
        console.debug(`error fetching state for ${tokenId}`, e)
      }

      if (nftState && nftState.codeHash === NFTFactory.contract.codeHash) {
        const metadataUri = hexToString(nftState.fields.uri as string)
        try {
          const metadata = (await axios.get(metadataUri)).data
          return {
            name: metadata.name,
            description: metadata.description,
            image: metadata.image,
            tokenId: tokenId,
            listed
          }
        } catch {
          return undefined
        }
      }
    }
  }

  async function loadNFTs() {
    if (context.signerProvider?.nodeProvider && context.account) {
      const allNFTsForAddress = await loadAllNFTsForAddress(context.account.address)
      setNfts(allNFTsForAddress)
    }

    setLoadingState('loaded')
  }

  async function loadAllNFTsForAddress(address: string) {
    const allNFTsOnUTXOs = await loadAllSelfCustodiedNFTsForAddress(address)
    const allListedNFTs = await loadAllListedNFTs(address)
    return allNFTsOnUTXOs.concat(allListedNFTs)
  }

  async function loadAllListedNFTs(address: string) {
    const items = []

    if (context.signerProvider) {
      const marketplaceContractAddress = addressFromContractId(marketplaceContractId)
      const listings = await fetchNFTListings(context.signerProvider, marketplaceContractAddress, address)
      const tokenIds = Array.from(listings.values()).map((listing) => listing.tokenId)
      for (var tokenId of tokenIds) {
        const nft = await loadNFT(tokenId, true)
        nft && items.push(nft)
      }
    }

    return items
  }

  async function loadAllSelfCustodiedNFTsForAddress(address: string) {
    const items = []

    if (context.signerProvider?.nodeProvider) {
      const balances = await context.signerProvider.nodeProvider.addresses.getAddressesAddressBalance(address)
      const tokenBalances = balances.tokenBalances !== undefined ? balances.tokenBalances : []
      const tokenIds = tokenBalances
        .filter((token) => +token.amount == 1)
        .map((token) => token.id)

      for (var tokenId of tokenIds) {
        const nft = await loadNFT(tokenId, false)
        nft && items.push(nft)
      }
    }

    return items;
  }

  function getNFTMarketplace(): NFTMarketplace | undefined {
    if (context.signerProvider?.nodeProvider && context.account) {
      return new NFTMarketplace(
        context.signerProvider.nodeProvider,
        context.signerProvider
      )
    }
  }

  function getNFTCollection(): NFTCollection | undefined {
    if (context.signerProvider?.nodeProvider && context.account) {
      return new NFTCollection(
        context.signerProvider.nodeProvider,
        context.signerProvider as SignerProvider
      )
    }
  }

  async function sellNFT(nft: NFT, price: number) {
    setShowSetPriceModal(false)

    const nftMarketplace = getNFTMarketplace()
    if (!!nftMarketplace) {
      const priceInSets = BigInt(price) * ONE_ALPH
      const listNFTTxResult = await nftMarketplace.listNFT(nft.tokenId, priceInSets, marketplaceContractId)

      setOngoingTxId(listNFTTxResult.txId)
      setOngoingTxDescription('listing NFT')
      setTxStatusCallback(() => async (txStatus: node.TxStatus) => {
        if (txStatus.type === 'Confirmed') {
          resetState()
          await loadNFTs()
        } else if (txStatus.type === 'TxNotFound') {
          resetState()
          console.error('List NFT transaction not found')
        }
      })
    }
  }

  function sellingNFT(nft: NFT) {
    setNftBeingSold(nft)
    setShowSetPriceModal(true)
  }

  function cancelSellingNFT() {
    setShowSetPriceModal(false)
    resetState()
  }

  if (loadingState === 'loaded' && nfts.length === 0) return (<h1 className="px-20 py-10 text-3xl">I have no NFTs</h1>)
  return (
    <>
      {
        ongoingTxId ? <TxStatusAlert txId={ongoingTxId} description={ongoingTxDescription} txStatusCallback={txStatusCallback} /> : undefined
      }

      <div className="flex justify-center">
        <div className="px-4" style={{ maxWidth: '1600px' }}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
            {
              nfts.map((nft, i) => (
                <div key={i} className="border shadow rounded-xl overflow-hidden">
                  <div className="p-4 object-center">
                    <img src={nft.image} />
                  </div>
                  <div className="p-4">
                    <p style={{ height: '64px' }} className="text-2xl font-semibold">{nft.name}</p>
                    <div style={{ height: '70px', overflow: 'hidden' }}>
                      <p className="text-gray-400">{nft.description}</p>
                    </div>
                  </div>
                  <div></div>
                  <div className="p-4 bg-black">
                    {
                      nft.listed ?
                        <button className="mt-4 w-full bg-pink-300 text-white font-bold py-1 m-2 w-32 rounded disable" disabled>Listed</button> :
                        <button className="mt-4 w-full bg-pink-500 text-white font-bold py-1 m-2 w-32 rounded" onClick={() => sellingNFT(nft)}>Sell</button>
                    }
                  </div>
                </div>
              ))
            }
          </div>
          {showSetPriceModal && nftBeingSold ? (
            <>
              <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50">
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                  <div className="rounded-lg shadow-lg relative flex flex-col w-full bg-white">
                    <form className="bg-black shadow-md rounded px-10 pt-6 pb-8 w-full">
                      <label className="block text-white text-sm font-bold mb-1">
                        Price (ALPH)
                      </label>
                      <input
                        type="number"
                        min="0"
                        onChange={e => setNftSellingPrice(+e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                      />
                    </form>
                    <div className="flex bg-white items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                      <button
                        className="mt-4 bg-gray-500 text-white font-bold py-1 m-2 w-32 rounded"
                        type="button"
                        onClick={() => cancelSellingNFT()}
                      >
                        Cancel
                      </button>
                      {
                        (nftSellingPrice && (nftSellingPrice > minimumNFTPrice)) ?
                          <button
                            className="mt-4 w-full bg-pink-500 text-white font-bold py-2 px-12 rounded"
                            type="button"
                            onClick={() => sellNFT(nftBeingSold, nftSellingPrice)}
                          >
                            Submit
                          </button> :
                          <button
                            className="mt-4 w-full bg-pink-500 text-white font-bold py-2 px-12 rounded"
                            type="button"
                            disabled
                          >
                            Submit
                          </button>
                      }
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </>
  )
}
