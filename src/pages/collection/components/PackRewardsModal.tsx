import { FC } from "react";
import { Modal } from "@/components/common";
import { PackRewards } from "@thirdweb-dev/sdk/dist/declarations/src/evm/schema";
import PackReward from "./PackReward";

interface PackRewardsModalProps {
  packRewards: PackRewards[] | undefined;
  isOpen: boolean;
  closeModal: () => void;
}

const PackRewardsModal: FC<PackRewardsModalProps> = ({
  packRewards,
  isOpen,
  closeModal,
}) => {
  return (
    <Modal
      title="Pack rewards"
      isOpen={isOpen}
      closeModal={closeModal}
      content={
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {packRewards?.map((packReward, index) => (
              <PackReward key={index.toString()} reward={packReward} />
            ))}
          </div>
          <div className="py-2 mt-5 flex justify-center">
            <button className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" onClick={closeModal}>Close</button>
          </div>
        </>
      }
    />
  );
};

export default PackRewardsModal;
