import { Tab } from "@headlessui/react"
import { CardList, PackList } from "./components"

const TABS = [{
  name: 'My packs',
  Component: PackList
},
{
  name: 'My cards',
  Component: CardList
}
]

const Collection = () => {
  return (
    <>
      <h1 className="font-poppins mb-1 text-4xl">Collection</h1>

      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl p-1">
          {TABS.map(({ name }) => (
            <Tab
              key={name}
              className={({ selected }) =>
                `text-gray-900 ${selected ? "bg-[#85dae2] hover:bg-[#4ca8c1]" : "bg-white dark:bg-gray-800 dark:hover:bg-gray-700"} border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2  dark:text-white dark:border-gray-600  dark:hover:border-gray-600 dark:focus:ring-gray-700`
              }
            >
              {name}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2">
          {TABS.map(({ Component }, idx) => (
            <Tab.Panel
              key={idx}
              className="p-2"
            >
              <Component />
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>

    </>
  )
}

export default Collection