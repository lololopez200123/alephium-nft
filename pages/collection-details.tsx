import { useRouter } from 'next/router'
import { useAlephiumConnectContext } from '@alephium/web3-react'
import { useCollection } from '../components/nft-collection'
import { Button, NFTCard } from '../components'
import Image from 'next/image';
import images from '../assets';
import { shortenAddress } from '../utils/shortenAddress';

export default function CollectionDetails() {
  const context = useAlephiumConnectContext()
  const router = useRouter()
  const { collectionId } = router.query

  const { collection } = useCollection(collectionId as string, context.signerProvider)

  if (!collectionId) return (<h1 className="px-20 py-10 text-3xl">No collection</h1>)

  return (
    <>
      {
        collection && (
          <div className="relative flex justify-center md:flex-col min-h-screen">
            <div className="relative flex-1 flexCenter sm:px-4 p-12 border-r md:border-r-0 md:border-b dark:border-nft-black-1 border-nft-gray-1">
              <div className="relative w-557 minmd:w-2/3 minmd:h-2/3 sm:w-full sm:h-300 h-557 ">
                <Image src={collection.image} objectFit="cover" className=" rounded-xl shadow-lg" layout="fill" />
              </div>
            </div>
            <div className="flex-1 justify-start sm:px-4 p-12 sm:pb-4">
              <div className="flex flex-row sm:flex-col">
                <h2 className="font-poppins dark:text-white text-nft-black-1 font-semibold text-2xl minlg:text-3xl">{collection.name}</h2>
              </div>

              <div className="mt-10">
                <p className="font-poppins dark:text-white text-nft-black-1 text-xs minlg:text-base font-normal">Owner</p>
                <div className="flex flex-row items-center mt-3">
                  <div className="relative w-12 h-12 minlg:w-20 minlg:h-20 mr-2">
                    <Image src={images.creator1} objectFit="cover" className="rounded-full" />
                  </div>
                  <p className="font-poppins dark:text-white text-nft-black-1 text-sm minlg:text-lg font-semibold">
                    {shortenAddress(context.account?.address)}
                  </p>
                </div>
              </div>

              <div className="mt-10 flex flex-col">
                <div className="w-full border-b dark:border-nft-black-1 border-nft-gray-1 flex flex-row">
                  <p className="font-poppins dark:text-white text-nft-black-1 font-medium text-base mb-2">Details</p>
                </div>
                <div className="mt-3">
                  <p className="font-poppins dark:text-white text-nft-black-1 font-normal text-base">
                    {collection.description}
                  </p>
                </div>
              </div>
              <div className="mt-10 flex flex-wrap">
                <div className="w-full border-b dark:border-nft-black-1 border-nft-gray-1 flex flex-row">
                  <p className="font-poppins dark:text-white text-nft-black-1 font-medium text-base mb-2">
                    {`${collection.totalSupply} NFTs`}
                  </p>
                </div>
                {
                  collection.nfts.map((nft, i) => {
                    return (
                      <NFTCard
                        key={i}
                        nft={{ tokenOwner: context.account?.address || '', ...nft }}
                      />
                    )
                  })
                }
              </div>

              <div className="flex flex-row sm:flex-col mt-10">
                <Button
                  btnName={"Mint More"}
                  classStyles="mr-5 sm:mr-0 sm:mb-5 rounded-xl"
                  handleClick={() => router.push(`/mint-nft?collectionId=${collection.id}`)}
                />
              </div>
            </div>
          </div>
        )
      }
    </>
  )
}
