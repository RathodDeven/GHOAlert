import { WagmiConfig, createConfig } from 'wagmi'
import { ConnectKitProvider, getDefaultConfig } from 'connectkit'
import { sepolia } from 'wagmi/chains'

const config = createConfig(
  getDefaultConfig({
    // Required API Keys
    alchemyId: process.env.NEXT_PUBLIC_ALCHEMY_ID, // or infuraId
    walletConnectProjectId: String(
      process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID
    ),
    chains: [sepolia],

    // Required
    appName: 'GHOAlert',

    // Optional
    appDescription: 'OBS Plugin to get Alerts upon receiving GHO',
    appUrl: 'https://family.co', // your app's url
    appIcon: 'https://family.co/logo.png' // your app's icon, no bigger than 1024x1024px (max. 1MB)
  })
)
const ConnectKitWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <WagmiConfig config={config}>
      <ConnectKitProvider theme="midnight">{children}</ConnectKitProvider>
    </WagmiConfig>
  )
}

export default ConnectKitWrapper
