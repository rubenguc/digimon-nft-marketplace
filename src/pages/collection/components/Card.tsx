import { FC } from "react"
import { NFT, ThirdwebNftMedia } from "@thirdweb-dev/react"

interface CardProps {
  nft: NFT
  setSelectedNFT: (nft: NFT) => void
}

interface Metadata {
  trait_type: string
  value: string
}

const Card: FC<CardProps> = ({
  nft,
  setSelectedNFT
}) => {

  const atributes = nft?.metadata?.attributes as unknown as Metadata[]

  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 overflow-hidden">
      <ThirdwebNftMedia metadata={nft.metadata} width="100%" />

      <div className="p-5">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {nft.metadata.name}
        </h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-300">
          Qty: {nft.quantityOwned}
        </p>
        <div className="flex flex-col gap-1">
          {
            atributes?.map((attribute) => (
              <p key={attribute.trait_type} className="font-normal text-gray-700 dark:text-gray-300">
                {attribute.trait_type}: {attribute.value}
              </p>
            ))
          }

        </div>
        <button
          onClick={() => setSelectedNFT(nft)}
        >Sell Card</button>
      </div>
    </div>
  )
}

export default Card