import { useState } from "react";

const useModal = (initialValue = false) => {
  const [isModalOpen, setIsModalOpen] = useState(initialValue);

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => setIsModalOpen(false);

  return {
    isModalOpen,
    openModal,
    closeModal,
  };
};

export default useModal;
