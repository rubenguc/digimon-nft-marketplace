import { useState } from 'react';
import { PACK_ADDRESS } from '@/constants';
import { useAddress, useContract, useOwnedNFTs } from '@thirdweb-dev/react';
import { PackRewards } from '@thirdweb-dev/sdk/dist/declarations/src/evm/schema';
import Pack from './Pack';
import { useModal } from '@/hooks';
import PackRewardsModal from './PackRewardsModal';

const PackList = () => {
  const address = useAddress();

  const { contract } = useContract(PACK_ADDRESS, "pack");
  const { data, isLoading } = useOwnedNFTs(contract, address);

  const { isModalOpen, openModal, closeModal } = useModal()

  const [openPackRewards, setOpenPackRewards] = useState<PackRewards>({
    erc1155Rewards: []
  });

  const openPack = async (packId: string) => {
    const cardRewards = await contract?.open(parseInt(packId), 1);
    setOpenPackRewards(cardRewards);
    openModal();
  }

  const handleCloseModal = () => {
    setOpenPackRewards(undefined);
    closeModal();
  }

  if (isLoading) {
    return (
      <p>Loading...</p>

    )
  }

  return (
    <>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
        {
          data?.map((pack) => <Pack key={pack.metadata.id} pack={pack} openPack={openPack} />)
        }
      </div>
      <PackRewardsModal
        isOpen={isModalOpen}
        closeModal={handleCloseModal}
        packRewards={openPackRewards?.erc1155Rewards || []}
      />
    </>
  )
}

export default PackList