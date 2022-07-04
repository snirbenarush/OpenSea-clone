import '../styles/globals.css'
import {ThirdwebWeb3Provider} from '@3rdweb/hooks'
// import type { AppProps } from 'next/app'
const supportedChainIds=[4];
const connectors={
  injected:{},
}
function MyApp({ Component, pageProps }) {
  return (<ThirdwebWeb3Provider
  connectors={connectors}
  supportedChainIds={supportedChainIds}>
    


 <Component {...pageProps} />



  </ThirdwebWeb3Provider>
  )
}

export default MyApp
