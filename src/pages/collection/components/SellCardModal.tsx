/* eslint-disable @typescript-eslint/ban-ts-comment */
import { FC } from "react";
import { Modal } from "@/components/common";
import { CARD_ADDRESS, MARKETPLACE_ADDRESS } from "@/constants";
import {
  NFT,
  ThirdwebNftMedia,
  Web3Button,
  useAddress,
  useContract,
  useCreateDirectListing,
} from "@thirdweb-dev/react";
import { useForm } from "react-hook-form";

interface SellCardModalProps {
  nft: NFT;
  isOpen: boolean;
  onClose: () => void;
}

type ListingFormData = {
  nftContractAddress: string;
  tokenId: string;
  price: string;
  startDate: Date;
  endDate: Date;
  quantity: number;
};

const SellCardModal: FC<SellCardModalProps> = ({ nft, isOpen, onClose }) => {
  const address = useAddress();

  const { contract: marketplace } = useContract(
    MARKETPLACE_ADDRESS,
    "marketplace-v3"
  );
  const { contract: nftCollection } = useContract(CARD_ADDRESS);

  const { mutateAsync: createDirectListing } =
    useCreateDirectListing(marketplace);

  const { register, handleSubmit } = useForm<ListingFormData>({
    defaultValues: {
      nftContractAddress: CARD_ADDRESS,
      tokenId: nft?.metadata?.id,
      price: "0",
      startDate: new Date(),
      endDate: new Date(),
      quantity: 1
    },
  });

  const checkAndProvideApproval = async () => {

    // @ts-ignore
    const hasApproval = await nftCollection?.call("isApprovedForAll", [
      address!,
      MARKETPLACE_ADDRESS,
    ]);

    if (!hasApproval) {
      // @ts-ignore
      const txResult = await nftCollection?.call("setApprovalForAll", [
        MARKETPLACE_ADDRESS,
        true,
      ]);

      if (txResult) {
        console.log(txResult);
      }
    }

    return true;
  };

  const onSubmit = async (data: ListingFormData) => {
    data.tokenId ??= nft?.metadata?.id;

    await checkAndProvideApproval();
    const txResult = await createDirectListing({
      assetContractAddress: data.nftContractAddress,
      tokenId: data.tokenId,
      pricePerToken: data.price,
      startTimestamp: new Date(data.startDate),
      endTimestamp: new Date(data.endDate),
      quantity: data.quantity,
    });

    return txResult;
  };

  return (
    <Modal
      title="Sell card"
      isOpen={isOpen}
      closeModal={onClose}
      content={
        <div>
          <div className="flex flex-col gap-2 mb-5">
            {nft?.metadata && (
              <ThirdwebNftMedia metadata={nft?.metadata} width="100%" />
            )}
            <div>
              <label
                htmlFor="startDate"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Start date:
              </label>
              <input
                type="datetime-local"
                {...register("startDate")}
                id="startDate"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label
                htmlFor="endDate"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                End date:
              </label>
              <input
                type="datetime-local"
                {...register("endDate")}
                id="endDate"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label
                htmlFor="price"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Price:
              </label>
              <input
                type="number"
                {...register("price")}
                step={0.01}
                id="price"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>


            <div>
              <label
                htmlFor="quantity"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Quantity:
              </label>
              <input
                type="number"
                {...register("quantity")}
                id="quantity"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
          </div>

          <Web3Button
            style={{
              width: "100%",
            }}
            contractAddress={MARKETPLACE_ADDRESS}
            action={async () => {
              await handleSubmit(onSubmit)();
            }}
            onSuccess={() => {
              console.log("success");
              onClose();
            }}
          >
            List for sale
          </Web3Button>
        </div>
      }
    />
  );
};

export default SellCardModal;
