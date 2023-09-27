import { Link } from "@tanstack/react-router"
import ConnectButton from "./ConnectButton"
import digiviceLogo from "/favicon.svg"

const ROUTES = [
  {
    name: 'shop',
    href: '/shop'
  },
  {
    name: 'collection',
    href: '/collection'
  }
]

const Header = () => {
  return (
    <header className="flex items-center py-2 px-4 justify-between">
      <Link to="/" className="flex items-center gap-2">
        <img src={digiviceLogo} alt="digivice logo" />
        <span className="font-poppins font-bold text-lg">Marketplace</span>
      </Link>

      <div className="flex gap-3">
        {
          ROUTES.map(({ href, name }) => (
            <Link to={href} key={name}>{name}</Link>
          ))
        }
      </div>

      <ConnectButton />

    </header>
  )
}

export default Header