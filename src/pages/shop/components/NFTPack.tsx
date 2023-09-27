import { FC } from "react";
import {
  MediaRenderer,
  Web3Button,
  useAddress,
  useContract,
  useDirectListings,
  useNFT,
} from "@thirdweb-dev/react";
import { MARKETPLACE_ADDRESS, PACK_ADDRESS } from "@/constants";

interface NFTPackProps {
  contractAddress: string;
  tokenId: string;
}

const NFTPack: FC<NFTPackProps> = ({ contractAddress, tokenId }) => {
  const address = useAddress();

  const { contract: marketplace, isLoading: isLoadingMarketplace } =
    useContract(MARKETPLACE_ADDRESS, "marketplace-v3");
  const { contract: packContract } = useContract(contractAddress);
  const { data: packNFT, isLoading: isLoadingNFT } = useNFT(
    packContract,
    tokenId
  );

  const { data: packListings, isLoading: isLoadingPackListings } =
    useDirectListings(marketplace, {
      tokenContract: PACK_ADDRESS,
    });

  const buyPack = async () => {
    if (packListings?.[Number(tokenId)]) {
      await marketplace?.directListings.buyFromListing(
        packListings[Number(tokenId)].id,
        1
      )
    } else {
      throw new Error("No valid listing found");
    }

  };

  const isLoading =
    isLoadingNFT && isLoadingPackListings && isLoadingMarketplace;
  const cost = `${packListings![Number(tokenId)].currencyValuePerToken.displayValue} ${` ` + packListings![Number(tokenId)].currencyValuePerToken.symbol
    }`;
  const supply = packListings![Number(tokenId)].quantity;


  return (
    <div>
      {isLoading ? (
        <p>loading...</p>
      ) : (
        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <MediaRenderer
            src={packNFT?.metadata?.image}
            width="100%"
            height="100%"
            className="rounded-t-lg"
          />
          <div className="p-5">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{packNFT?.metadata?.name}</h5>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-300">Cost: {cost}</p>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-300">supply: {supply}</p>

            {!address ? (
              <p>Login to buy</p>
            ) : (
              <Web3Button
                contractAddress={MARKETPLACE_ADDRESS}
                action={() => buyPack()}
                style={{
                  width: "100%",
                }}
              >
                Buy Pack
              </Web3Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NFTPack;
