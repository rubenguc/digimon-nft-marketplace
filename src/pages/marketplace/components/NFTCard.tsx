import { FC } from "react";
import { CARD_ADDRESS, MARKETPLACE_ADDRESS } from "@/constants";
import { MediaRenderer, Web3Button, useAddress, useContract, useDirectListing, useNFT } from "@thirdweb-dev/react";

interface NFTCardProps {
  tokenID: string;
  listingID: string;
}

const NFTCard: FC<NFTCardProps> = ({
  tokenID,
  listingID
}) => {
  const address = useAddress();

  const {
    contract: cardContract,
  } = useContract(CARD_ADDRESS, "edition");
  const {
    data: nft
  } = useNFT(cardContract, tokenID);

  const {
    contract: marketplace
  } = useContract(MARKETPLACE_ADDRESS, "marketplace-v3");

  const {
    data: listing,
    // isLoading: isLoadingListing
  } = useDirectListing(marketplace, listingID);

  const buyNFT = async () => {
    let txResult;

    if (listing) {
      txResult = await marketplace?.directListings.buyFromListing(
        listing.id,
        1
      )
    } else {
      throw new Error("No valid listing found");
    }

    return txResult;
  }

  // TODO: add loading

  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 overflow-hidden">
      <MediaRenderer
        src={nft?.metadata?.image}
        height="200px"
        width="200px"
      />
      <div className="p-5">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {nft?.metadata.name}
        </h5>
        <p><strong>Price:</strong> {listing?.currencyValuePerToken.displayValue} {` ${listing?.currencyValuePerToken.symbol}`}</p>
        <p>qty: {listing?.quantity}</p>

        {!address ? (
          <p>Please login to buy</p>
        ) : (
          <Web3Button
            style={{
              width: "100%",
              marginTop: '1rem'
            }}
            contractAddress={MARKETPLACE_ADDRESS}
            action={() => buyNFT()}
          >Buy Now</Web3Button>
        )}

      </div>

    </div>)

}

export default NFTCard