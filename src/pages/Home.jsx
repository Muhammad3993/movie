// import components
import { useSelector } from 'react-redux'
import BannerHome from '../components/BannerHome'
import HorizontalScroll from '../components/HorizontalScroll';
import { nowPlayingApi } from '../data/nowPlayingApi';
import { useEffect, useState } from 'react';
import { popularApi } from '../data/popularApi';
import { popularTvShow } from '../data/popularTvShow';
import { onTheAir } from '../data/onTheAir';

const Home = () => {

  const {bannerData: trendingData} = useSelector(state => state.movieData);

  const [nowPlaying, setNowPlaying] = useState(null)
  const [popular, setPopular] = useState(null)
  const [popularTvSHow, setPopularTvSHow] = useState(null)
  const [ontheAir, setOntheAir] = useState(null)

  const getNowPlaying = async () => {
    const response = await nowPlayingApi.getNowPlayingApi()
    setNowPlaying(response.results)
  }

  const getPopular = async () => {
    const response = await popularApi.getPopularApi()
    setPopular(response.results)
  }  
  
  const getPopularTvShow = async () => {
    const response = await popularTvShow.getPopularTvShow()
    setPopularTvSHow(response.results)
  }
  
  const getOnTheAir = async () => {
    const response = await onTheAir.getOnTheAirApi()
    setOntheAir(response.results)
  }

  useEffect(() => {
    getNowPlaying()
    getPopular()
    getPopularTvShow()
    getOnTheAir()
  }, [])
  

  return (
    <>
      <BannerHome/>
      <HorizontalScroll data={trendingData} heading={"Trending"} trending={true} />
      <HorizontalScroll data={nowPlaying} heading={"Now Playing"} media_type={"movie"} />
      <HorizontalScroll data={popular} heading={"Top Rated Movies"} media_type={"movie"} />
      <HorizontalScroll data={popularTvSHow} heading={"Popular TV Show"} media_type={"tv"} />
      <HorizontalScroll data={ontheAir} heading={"On The Air"} media_type={"tv"} />
    </>
  )
}

export default Home