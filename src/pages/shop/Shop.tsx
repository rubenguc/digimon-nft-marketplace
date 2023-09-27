import { useContract, useDirectListings } from "@thirdweb-dev/react";
import { MARKETPLACE_ADDRESS, PACK_ADDRESS } from "../../constants";
import { NFTPack } from "./components";

const Shop = () => {
  const { contract: marketplace, isLoading: isLoadingMarketplace } =
    useContract(MARKETPLACE_ADDRESS, "marketplace-v3");

  const { data: directListings, isLoading: isLoadingDirectListings } =
    useDirectListings(marketplace, {
      tokenContract: PACK_ADDRESS,
    });

  const isLoading = isLoadingMarketplace || isLoadingDirectListings;



  return (
    <div>
      <h1 className="font-poppins mb-1 text-4xl">Shop packs</h1>

      {isLoading ? (
        <>Loading...</>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {
            directListings?.map(
              (listing) => <NFTPack
                key={listing.tokenId}
                contractAddress={listing.assetContractAddress}
                tokenId={listing.tokenId}
              />
            )
          }
        </div>
      )}
    </div>
  );
};

export default Shop;
