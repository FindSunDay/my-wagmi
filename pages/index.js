import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect} from 'react'
import { useAccount, useConnect } from 'wagmi'
import styles from '../styles/Home.module.css'

export default function Home() {
  const { connectors, connect } = useConnect()
  const { isConnected } = useAccount() 
  const router = useRouter()

  useEffect(() => {
    if (isConnected) {
      router.replace('/dashboard')
    }
  }, [isConnected])

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      { connectors.map(connector => 
        <button
          suppressHydrationWarning
          key={connector.id}
          onClick={() => connect({ connector })}
        >
          {connector.name}
        </button>
        
        ) }
    </div>
  )
}
