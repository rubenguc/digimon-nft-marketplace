import { FC } from 'react'
import { ThirdwebNftMedia, useContract, useNFT } from '@thirdweb-dev/react';
import { BigNumber } from 'ethers';
import { CARD_ADDRESS } from '@/constants';

interface PackRewardProps {
  reward: {
    tokenId: string | number | bigint | BigNumber;
    contractAddress: string;
    quantityPerReward: string | number | bigint | BigNumber;
  } | undefined;
}

const PackReward: FC<PackRewardProps> = ({
  reward
}) => {
  const { contract } = useContract(CARD_ADDRESS, "edition");
  const { data } = useNFT(contract, reward?.tokenId);


  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 overflow-hidden">
      {
        data && (
          <>
            <ThirdwebNftMedia
              metadata={data.metadata}
              height="200px"
              width="200px"
            />
            <div className='p-2'>

              <h3 className="mb-3 font-normal text-gray-700 dark:text-gray-300">{data.metadata.name}</h3>
            </div>
          </>
        )
      }
    </div>
  )
}

export default PackReward