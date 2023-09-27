import { BsGithub } from 'react-icons/bs'
import digiviceLogo from "/favicon.svg"

const Footer = () => {
  return (
    <footer className="bg-white shadow dark:bg-gray-800">
      <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <img src={digiviceLogo} alt="digivice logo" className='opacity-40' />
        <span className='text-gray-200'>still in development...</span>

        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
          <li>
            <a href="https://github.com/rubenguc/digimon-nft-marketplace" target='_blank' className='text-xl text-white'>
              <BsGithub />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  )
}

export default Footer