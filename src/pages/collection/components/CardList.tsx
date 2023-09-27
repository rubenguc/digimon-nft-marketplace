import { CARD_ADDRESS } from "@/constants";
import {

  useAddress,
  useContract,
  useOwnedNFTs,
} from "@thirdweb-dev/react";
import Card from "./Card";

const CardList = () => {
  const address = useAddress();

  const { contract: nftCollection, isLoading: isLoadingNFTCollection } =
    useContract(CARD_ADDRESS, "edition");

  const { data: nfts, isLoading: isLoadingNFTs } = useOwnedNFTs(
    nftCollection,
    address
  );

  const isLoading = isLoadingNFTCollection || isLoadingNFTs;

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {nfts?.map((nft) => (
        <Card key={nft.metadata.id} nft={nft} />
      ))}
    </div>
  );
};

export default CardList;
