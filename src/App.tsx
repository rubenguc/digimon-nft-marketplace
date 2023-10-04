import { Outlet, RootRoute, Route, Router, RouterProvider } from "@tanstack/react-router"
import { Footer, Header } from "@/components/layout"
import { Collection, Home, Marketplace, Shop } from "@/pages"

const rootRoute = new RootRoute({
  component: () => (
    <>
      <>
        <Header />
        <main className="p-4 max-w-5xl mx-auto">
          <Outlet />
        </main>
        <Footer />
      </>
    </>
  )
})

const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home
})

const shopRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/shop",
  component: Shop
})

const collectionRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/collection",
  component: Collection
})

const marketplaceRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/marketplace",
  component: Marketplace
})

const routeTree = rootRoute.addChildren([
  indexRoute,
  shopRoute,
  collectionRoute,
  marketplaceRoute
])

const router = new Router({
  routeTree
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
