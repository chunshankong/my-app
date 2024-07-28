
// config/index.tsx
import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'

import { cookieStorage, createStorage } from 'wagmi'
import { mainnet, sepolia,arbitrum } from 'wagmi/chains'

// Your WalletConnect Cloud project ID
export const projectId = '2dafa20dedf7ad7631f0d12b275a3315'

// Create a metadata object
const metadata = {
  name: 'louis web3 project',
  description: 'AppKit Example',
  url: 'https://web3modal.com', // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

// Create wagmiConfig
const chains = [mainnet, sepolia, arbitrum] as const

export const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage
  })
})