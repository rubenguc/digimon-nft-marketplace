import { createRoot } from 'react-dom/client'
import { ThirdwebProvider } from "@thirdweb-dev/react";
import App from '@/App.tsx'
import '@/index.css'
import { CLIENT_ID } from '@/constants.ts';

createRoot(document.getElementById('root')!).render(
  <ThirdwebProvider
    clientId={CLIENT_ID}
    activeChain={"mumbai"}
  >
    <App />
  </ThirdwebProvider>
  ,
)
