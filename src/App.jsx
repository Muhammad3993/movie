import { Outlet } from 'react-router-dom'
// import component
import Header from './components/Header'
import Footer from './components/Footer'
import MobileNavigation from './components/MobileNavigation'
import { useEffect } from 'react'
import { trendingApi } from './data/trendingApi'
import { useDispatch } from 'react-redux'
import { setBannerData, setImageUrl } from './store/movieSlice'
import { configurationApi } from './data/configurationApi'

const App = () => {
  const dispatch = useDispatch()

  const getTrending = async () => {
    const response = await trendingApi.getTrendingApi();
    dispatch(setBannerData(response.results))
  }

  const getConfiguration = async () => {
    const response = await configurationApi.getConfigurationApi();
    dispatch(setImageUrl(response.images.secure_base_url + "original"))
  }

  useEffect(() => {
    getTrending()
    getConfiguration()
  },[])


  return (
    <main className='pb-14 lg:pb-0'>
      <Header />
      <div className='min-h-[90vh] pt-16'>
        <Outlet />
      </div>
      <Footer />
      <MobileNavigation />
    </main>
  )
}

export default App