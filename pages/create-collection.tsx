import { useCallback, useState, useMemo } from 'react'
import { NFTCollection } from '../utils/nft-collection'
import { ipfsClient } from '../utils/ipfs'
import { useAlephiumConnectContext } from '@alephium/web3-react'
import { useRouter } from 'next/router'
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import images from '../assets';
import { useTheme } from 'next-themes'
import { Button, Input } from '../components';
import { ConnectToWalletBanner } from '../components/ConnectToWalletBanner'
import { waitTxConfirmed } from '../utils'
import LoaderWithText from '../components/LoaderWithText'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { convertAlphAmountWithDecimals } from '@alephium/web3'
import { useSnackbar } from 'notistack'

export default function CreateCollections() {
  const [fileUrl, setFileUrl] = useState<string | undefined>(undefined)
  const [formInput, updateFormInput] = useState({ name: '', description: '', nftBaseUri: '', maxSupply: '', mintPrice: '', maxBatchMintSize: '' })
  const context = useAlephiumConnectContext()
  const router = useRouter()
  const { theme } = useTheme();
  const [isCreatingCollection, setIsCreatingCollection] = useState<boolean>(false)
  const [isUploading, setIsUploading] = useState<boolean>(false)
  const { enqueueSnackbar } = useSnackbar()

  const onDrop = useCallback(async (acceptedFile: any[]) => {
    const file = acceptedFile[0]
    console.log("file", file)
    try {
      const added = await ipfsClient.add(
        {
          content: file,
        },
        {
          progress: (bytes, path) => {
            setIsUploading(true)
            console.log("bytes", bytes)
            console.log("path", path)
          }
        }
      )
      setIsUploading(false)
      const url: string = `https://alephium-nft.infura-ipfs.io/ipfs/${added.path}`
      console.log("url", url)
      setFileUrl(url)
    } catch (error) {
      console.log('Error uploading file: ', error)
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
    onDrop,
    accept: 'image/*',
    maxSize: 5000000,
  });

  const fileStyle = useMemo(() => (
    `dark:bg-nft-black-1 bg-white border dark:border-white border-nft-gray-2 flex flex-col items-center p-5 rounded-sm border-dashed
    ${isDragActive && ' border-file-active'}
    ${isDragAccept && ' border-file-accept'}
    ${isDragReject && ' border-file-reject'}
    `
  ), [isDragActive, isDragAccept, isDragReject]);

  async function uploadToIPFS(): Promise<string | undefined> {
    const { name, description } = formInput
    if (!name || !description || !fileUrl) return
    /* first, upload to IPFS */
    const data = JSON.stringify({
      name, description, image: fileUrl
    })
    try {
      const added = await ipfsClient.add(data)
      const url = `https://alephium-nft.infura-ipfs.io/ipfs/${added.cid}`
      /* after file is uploaded to IPFS, return the URL to use it in the transaction */
      return url
    } catch (error) {
      console.log('Error uploading file: ', error)
    }
  }

  async function createOpenCollection() {
    const collectionUri = await uploadToIPFS()
    if (collectionUri && context.signerProvider?.nodeProvider && context.account) {
      const nftCollection = new NFTCollection(context.signerProvider)
      setIsCreatingCollection(true)
      const createCollectionTxResult = await nftCollection.createOpenCollection(collectionUri)
      await waitTxConfirmed(context.signerProvider.nodeProvider, createCollectionTxResult.txId)
      router.push(`/collection-details?collectionId=${createCollectionTxResult.contractInstance.contractId}`)
    } else {
      console.debug('context..', context)
    }
  }

  async function createPublicSaleCollectionSequential() {
    try {
      const { nftBaseUri, maxSupply: maxSupplyStr, mintPrice: mintPriceStr, maxBatchMintSize: maxBatchMintSizeStr } = formInput
      // Verify that this URL is correct, metadata is valid
      if (!nftBaseUri || !maxSupplyStr || !mintPriceStr || !maxBatchMintSizeStr) return

      // TODO: how do we verify the max supply?
      const maxSupply = BigInt(maxSupplyStr)
      const mintPrice = convertAlphAmountWithDecimals(mintPriceStr)
      if (mintPrice === undefined || mintPrice < 0) {
        throw new Error('Invalid mint price')
      }
      const maxBatchMintSize = BigInt(maxBatchMintSizeStr)
      if (maxBatchMintSize > maxSupply) {
        throw new Error('Max batch mint size cannot be greater than max supply')
      }
      const collectionUri = await uploadToIPFS()
      if (collectionUri && context.signerProvider?.nodeProvider && context.account) {
        const nftCollection = new NFTCollection(context.signerProvider)
        setIsCreatingCollection(true)
        const createCollectionTxResult = await nftCollection.createPublicSaleCollectionSequential(maxSupply, mintPrice, collectionUri, nftBaseUri, maxBatchMintSize)
        await waitTxConfirmed(context.signerProvider.nodeProvider, createCollectionTxResult.txId)
        router.push(`/collection-details?collectionId=${createCollectionTxResult.contractInstance.contractId}`)
      } else {
        console.debug('context..', context)
      }
    } catch (error) {
      enqueueSnackbar(`${error}`, { variant: 'error', persist: false })
    }
  }

  function collectionImage() {
    return (
      <div className="mt-16">
        <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-xl">Upload Image for Collection Profile</p>
        <div className="mt-4">
          <div {...getRootProps()} className={fileStyle}>
            <input {...getInputProps()} />
            <div className="flexCenter flex-col text-center">
              <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-xl">
                JPG, PNG, GIF, SVG, WEBM Max 5mb.
              </p>
              {isUploading ? (
                <LoaderWithText text={`Uploading...`} />
              ) : (<div className="my-12 w-full flex justify-center">
                <Image
                  src={fileUrl || images.upload}
                  width={fileUrl ? 200 : 100}
                  height={fileUrl ? 200 : 100}
                  objectFit="contain"
                  alt="file upload"
                  className={theme === 'light' ? 'filter invert' : ''}
                />
              </div>)}
              <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-sm">
                Drag and Drop File,
              </p>
              <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-sm mt-2">
                or Browse media on your device.
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  function collectionName() {
    return (
      <Input
        inputType="input"
        title="Name"
        placeholder="NFT Collection Name"
        handleClick={(e) => updateFormInput({ ...formInput, name: (e.target as HTMLInputElement).value })}
      />
    )
  }

  function collectionDescription() {
    return (
      <Input
        inputType="textarea"
        title="Description"
        placeholder="NFT Collection Description"
        handleClick={(e) => updateFormInput({ ...formInput, description: (e.target as HTMLInputElement).value })}
      />
    )
  }

  function collectionMaxSupply() {
    return (
      <Input
        inputType="positiveInteger"
        title="Max Supply"
        placeholder="NFT Collection Max Supply"
        handleClick={(e) => updateFormInput({ ...formInput, maxSupply: (e.target as HTMLInputElement).value })}
        value={formInput.maxSupply}
      />
    )
  }

  function collectionMaxBatchMintSize() {
    return (
      <Input
        inputType="positiveInteger"
        title="Max Batch Mint Size"
        placeholder="NFT Collection Max Batch Mint Size"
        handleClick={(e) => updateFormInput({ ...formInput, maxBatchMintSize: (e.target as HTMLInputElement).value })}
        value={formInput.maxBatchMintSize}
      />
    )
  }

  function collectionMintPrice() {
    return (
      <Input
        inputType="alph"
        title="Mint Price"
        placeholder="NFT Collection Mint Price"
        handleClick={(e) => updateFormInput({ ...formInput, mintPrice: (e.target as HTMLInputElement).value })}
      />
    )
  }

  function collectionNFTBaseURI() {
    return (
      <Input
        inputType="input"
        title="NFT Base URI"
        placeholder="NFT Base URI"
        handleClick={(e) => updateFormInput({ ...formInput, nftBaseUri: (e.target as HTMLInputElement).value })}
      />
    )
  }

  function createCollectionButton(handleClick: () => void, type: 'NFTOpenCollection' | 'NFTPublicSaleCollection') {
    const disabled = type === 'NFTOpenCollection'
      ? (!fileUrl || !formInput.name || !formInput.description)
      : (!fileUrl || !formInput.name || !formInput.description || !formInput.maxSupply || !formInput.mintPrice || !formInput.maxBatchMintSize)
    return isCreatingCollection ? (
      <LoaderWithText text={`Sign and create collection...`} />
    ) : (
      <div className="mt-7 w-full flex justify-end">
        <Button
          btnName="Create NFT Collection"
          classStyles="rounded-xl"
          handleClick={handleClick}
          disabled={disabled}
        />
      </div>
    )
  }

  if (!context.account) {
    return (
      <ConnectToWalletBanner />
    );
  }

  return (
    <>
      <div className="flex justify-center sm:px-4 p-12">
        <div className="w-3/5 md:w-full">
          <Tabs>
            <TabList>
              <Tab>Open Collection</Tab>
              <Tab>Pre-designed Collection</Tab>
            </TabList>
            <TabPanel>
              {collectionImage()}
              {collectionName()}
              {collectionDescription()}
              {createCollectionButton(() => createOpenCollection(), 'NFTOpenCollection')}
            </TabPanel>
            <TabPanel>
              {collectionImage()}
              {collectionMaxSupply()}
              {collectionMaxBatchMintSize()}
              {collectionMintPrice()}
              {collectionNFTBaseURI()}
              {collectionName()}
              {collectionDescription()}
              {createCollectionButton(() => createPublicSaleCollectionSequential(), 'NFTPublicSaleCollection')}
            </TabPanel>
          </Tabs>
        </div>
      </div>
    </>
  )
}
