import { Fragment, HTMLAttributes } from "react";
import { ConnectWallet, useAddress, useDisconnect } from "@thirdweb-dev/react";
import { Menu, Transition } from '@headlessui/react'

const BUTTON_CLASSNAME: HTMLAttributes<HTMLDivElement>["className"] = "text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"

const ConnectButton = () => {
  const address = useAddress();
  const disconnect = useDisconnect();

  if (!address) {
    return (
      <ConnectWallet
        btnTitle="Connect wallet"
        className={BUTTON_CLASSNAME}
      />
    )
  }

  return (
    <>
      <Menu as="div" className="relative inline-block text-left">
        <Menu.Button className={`${BUTTON_CLASSNAME} max-w-[140px] text-ellipsis overflow-hidden block`}>
          {address}
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={disconnect}
                >
                  Log out
                </button>
              )}
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  )
}

export default ConnectButton