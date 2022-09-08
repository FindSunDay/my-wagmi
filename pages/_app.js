import { chain, configureChains, createClient, defaultChains, WagmiConfig } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import '../styles/globals.css'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'

const { chains, provider, webSocketProvider } = configureChains(defaultChains, [publicProvider()])

console.log('xxxx', defaultChains, [publicProvider()])

const client = createClient({
  autoConnect: true,
  provider,
  webSocketProvider,
  connectors: [
    new WalletConnectConnector({ chains }),
    new CoinbaseWalletConnector({ chains }),
    new InjectedConnector({ chains, options: { name: "Injected" } }),
    new MetaMaskConnector({ chains }),
  ],
})

function MyApp({ Component, pageProps }) {
  console.log('client', client)
  return (
    <WagmiConfig client={client}>
      <Component {...pageProps} />
    </WagmiConfig>
  )
}

export default MyApp
