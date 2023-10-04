import { CARD_ADDRESS, MARKETPLACE_ADDRESS } from "@/constants";
import { useContract, useValidDirectListings } from "@thirdweb-dev/react";
import NFTCard from "./components/NFTCard";

const Marketplace = () => {
  const {
    contract: marketplace
  } = useContract(MARKETPLACE_ADDRESS, "marketplace-v3");

  const {
    data: directListings,
    isLoading: isLoadingDirectListings,
  } = useValidDirectListings(
    marketplace,
    {
      tokenContract: CARD_ADDRESS,
    }
  )

  const isLoading = isLoadingDirectListings


  return (
    <div>
      <h1 className="font-poppins mb-1 text-4xl">Marketplace</h1>

      {isLoading ? (
        <>Loading...</>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {
            directListings?.map(
              (listing) => <NFTCard
                tokenID={listing.asset.id}
                listingID={listing.id}
              />
            )
          }
        </div>
      )}
    </div>
  )
}

export default Marketplace