import { CARD_ADDRESS } from "@/constants";
import {
  NFT,
  useAddress,
  useContract,
  useOwnedNFTs,
} from "@thirdweb-dev/react";
import Card from "./Card";
import { useState } from "react";
import { useModal } from "@/hooks";
import { SellCardModal } from ".";

const CardList = () => {
  const address = useAddress();

  const { contract: nftCollection, isLoading: isLoadingNFTCollection } =
    useContract(CARD_ADDRESS, "edition");

  const { data: nfts, isLoading: isLoadingNFTs } = useOwnedNFTs(
    nftCollection,
    address
  );

  const { isModalOpen, openModal, closeModal } = useModal()

  const [selectedNFT, setSelectedNFT] = useState<NFT>();

  const isLoading = isLoadingNFTCollection || isLoadingNFTs;

  const selectNFTToSell = (nft: NFT) => {
    setSelectedNFT(nft);
    openModal();
  }

  const closeModalAndResetNFT = () => {
    setSelectedNFT(undefined);
    closeModal();
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {nfts?.map((nft) => (
        <Card key={nft.metadata.id} nft={nft} setSelectedNFT={selectNFTToSell} />
      ))}
      <SellCardModal
        nft={selectedNFT!}
        isOpen={isModalOpen}
        onClose={closeModalAndResetNFT}
      />
    </div>
  );
};

export default CardList;
