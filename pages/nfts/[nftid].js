import React,{useEffect,useMemo,useState} from 'react'
import Header from '../../components/Header'
import {useWeb3} from '@3rdweb/hooks'
import {ThirdwebSDK} from '@3rdweb/sdk'
import {useRouter} from 'next/router'
import NFTImage from '../../components/NFT/NFTImage'
import GeneralDetails from '../../components/NFT/GeneralDetails'
import ItemActivity from '../../components/NFT/itemActivity'
import Purchase from '../../components/NFT/Purchase'

const style = {
    wrapper: `flex flex-col items-center container-lg text-[#e5e8eb]`,
    container: `container p-6`,
    topContent: `flex`,
    nftImgContainer: `flex-1 mr-4`,
    detailsContainer: `flex-[2] ml-4`,
  }


  
const Nft = () => {
const {provider} = useWeb3()
const [selectedNft,setSelectedNft]=useState()
const [listings,setListings]=useState([])
const router=useRouter()

const nftModule= useMemo(()=>{
  if (!provider) return
  const sdk= new ThirdwebSDK(
    provider.getSigner(),
    // 'https://eth-rinkeby.alchemyapi.io/v2/b3dM2aUU7LoBBJGIB6I2wjNU2HB4nuDF'
  )
  return sdk.getNFTModule('0x3e739e2402feF76d31E739F39704E9133B7a9A0E')
},[provider])

useEffect(()=>{
if(!nftModule) return
;(async()=>{
  const nfts=await nftModule.getAll()
  const selectedNftItem= nfts.find( 
    (nft)=>nft.id== router.query.nftid
  )
  setSelectedNft(selectedNftItem)
})()
},[nftModule])

const marketPlaceModule = useMemo(() => {
  if (!provider) return

  const sdk = new ThirdwebSDK(
    provider.getSigner(),
    // 'https://eth-rinkeby.alchemyapi.io/v2/b3dM2aUU7LoBBJGIB6I2wjNU2HB4nuDF'
    // 'https://rinkeby.infura.io/v3/0e745672da9d46cc9d8cfa8dc13093c2'
  )
  return sdk.getMarketplaceModule(
    '0x93A771F7ce845C33381f677489cF21a5964EDD0b'
  )
}, [provider])
useEffect(()=>{
  if(!marketPlaceModule)return
  ;(async()=>{
    setListings(await marketPlaceModule.getAllListings())
  })()
},[marketPlaceModule])

  return (
    <div 

    >
       <Header/>
       <div className={style.wrapper}>
       <div className={style.container}>
       <div className={style.topContent}>
       <div className={style.nftImgContainer}>
       <NFTImage selectedNft={selectedNft}/>
</div>
<div className={style.detailsContainer}>
  <GeneralDetails selectedNft={selectedNft}/>
  <Purchase
  isListed={router.query.isListed}
  selectedNft={selectedNft}
  listings={listings}
  marketPlaceModule={marketPlaceModule}/>
</div>
</div>
<ItemActivity/>
</div>
       </div>
       
    </div>
  
  )
}

export default Nft