import { FC } from 'react'
import { PACK_ADDRESS } from '@/constants'
import { NFT, ThirdwebNftMedia, Web3Button } from '@thirdweb-dev/react'

interface PackProps {
  pack: NFT
  openPack: (packId: string) => void
}

const Pack: FC<PackProps> = ({
  pack,
  openPack
}) => {
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 overflow-hidden">
      <ThirdwebNftMedia
        width="100%"
        metadata={pack.metadata}
        style={{
          objectFit: "cover"
        }}
      />
      <div className='p-5'>
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{pack.metadata.name}</h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-300">Qty: {pack.quantityOwned}</p>
        <Web3Button
          contractAddress={PACK_ADDRESS}
          action={() => openPack(pack.metadata.id)}
        >Open Pack</Web3Button>
      </div>
    </div>
  )
}

export default Pack