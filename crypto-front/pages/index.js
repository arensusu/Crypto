import Head from 'next/head'
import { ConnectButton } from 'web3uikit'
import SusuToken from "../components/SusuToken"

export default function Home() {
  return (
    <>
      <Head>
        <title>Blockchain Project</title>
      </Head>
      <nav>
        <h1>Blockchain Project</h1>
        <div>
          <ConnectButton moralisAuth={false}/>
        </div>
      </nav>
      <SusuToken/>
      
    </>
  )
}
