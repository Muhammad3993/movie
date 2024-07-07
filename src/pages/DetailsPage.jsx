import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { detailsApi } from '../data/detailsApi';
import { detailsCredit } from '../data/detailsCredit';
import { useSelector } from 'react-redux';
import moment from 'moment';
import Divider from '../components/Divider';
import { detailsSimilar } from '../data/detailsSimilar';
import HorizontalScroll from '../components/HorizontalScroll';
import { recommendApi } from '../data/recommendApi';
import VideoPlay from '../components/VideoPlay';

const DetailsPage = () => {
  const { imageUrl} = useSelector(state => state.movieData)
  const params = useParams();
  const [detailsResponse, setDetailsResponse] = useState(null)
  const [detailsCreditResponse, setDetailsCreditResponse] = useState(null)
  const [detailsSimilarResponse, setDetailsSimilarResponse] = useState(null)
  const [recommendResponse, setRecommendResponse] = useState(null)
  const [playVideo, setPlayVideo] = useState(false)
  const [playVideoId, setPlayVideoId] = useState("")

  const getDetails = async () => {
    const response = await detailsApi.getDetailsApi(params?.explore, params?.id)
    setDetailsResponse(response)
  }  
  const getDetailsCredit = async () => {
    const response = await detailsCredit.getDetailsCredit(params?.explore, params?.id)
    setDetailsCreditResponse(response)
  }

  const getDetailsSimilar = async () => {
    const response = await detailsSimilar.getDetailsSimilar(params?.explore, params?.id)
    setDetailsSimilarResponse(response)
  }

  const getDetailsRecommend = async () => {
    const response = await recommendApi.getRecommendations(params?.explore, params?.id)
    setRecommendResponse(response)
  }



  useEffect(() => {
    getDetails();
    getDetailsCredit();
    getDetailsSimilar();
    getDetailsRecommend();
  }, [params?.explore, params?.id])

  const handlePlay = (data) => {
    setPlayVideo(true)
    setPlayVideoId(data)
  }
  const duration = (Number(detailsResponse && detailsResponse?.runtime)/60).toFixed(1).split(".");


  return (
    <div>
      <div className='w-full h-[280px] relative hidden lg:block'>
        <div className='w-full h-full'>
          <img 
            src={imageUrl + (detailsResponse && detailsResponse?.backdrop_path)} 
            alt="" 
            className='w-full h-full object-cover'
          />
        </div>
        <div className="absolute w-full h-full top-0 bg-gradient-to-t from-neutral-900/100 to-transparent"></div>
      </div>

      <div className='container mx-auto px-3 py-16 lg:py-0 flex flex-col lg:flex-row gap-5 lg:gap-10'>
        <div className='lg:-mt-28 mx-auto relative lg:mx-0 w-fit min-w-60'>
          <img 
            src={imageUrl + (detailsResponse && detailsResponse?.poster_path)} 
            alt="" 
            className='w-60 h-80 object-cover rounded'
          />
          <button className='mt-3 w-full py-2 px-4 text-center bg-white text-black rounded font-bold text-lg hover:bg-gradient-to-l from-red-500 to-orange-500 hover:scale-105 transition-all' onClick={() => handlePlay(detailsResponse)}>Play Now</button>
        </div>
        <div>
          <h2 className='text-2xl lg:text-4xl font-bold text-white'>{detailsResponse && detailsResponse?.title || detailsResponse && detailsResponse?.name}</h2>
          <p className='text-neutral-400'>{detailsResponse && detailsResponse.tagline}</p>

          <Divider />

          <div className='flex items-center gap-3'>
            <p>
              Rating:  {detailsResponse && Number(detailsResponse?.vote_average).toFixed(1)}+
            </p>            
            <span>|</span>
            <p>
              View:  {detailsResponse && Number(detailsResponse?.vote_count).toFixed(0)}
            </p>   
            <span>|</span>
            <p>
              Duration:  {duration[0]}h {duration[1]}m
            </p>
          </div>

          <Divider />

          <div>
            <h3 className='text-xl font-bold text-white mb-1'>Overview</h3>
            <p>{detailsResponse && detailsResponse?.overview}</p>

            <Divider />

            <div className='flex items-center gap-3 my-3 text-center'>
              <p>Status: {detailsResponse && detailsResponse?.status}</p>
              <span>|</span>
              <p>Release Date: {moment(detailsResponse && detailsResponse?.release_date).format("MMMM Do YYYY")}</p>
              <span>|</span>
              <p>Revenue: {Number(detailsResponse && detailsResponse?.revenue)}</p>
            </div>

            <Divider />
          </div>

          <div>
            <p><span className='text-white'>Director</span>: {detailsCreditResponse && detailsCreditResponse?.crew[0]?.name}</p>
            <Divider />
            <p><span className='text-white'>Writer</span>: {detailsCreditResponse && detailsCreditResponse?.crew.filter(el => el?.job === "Writer").map(el => el.name)}</p>
          </div>

          <Divider />

          <h2 className='font-bold text-lg'>Cast: </h2>

          <div className='grid grid-cols-[repeat(auto-fit,96px)] gap-5'>
            {
              detailsCreditResponse && detailsCreditResponse?.cast?.filter(el => el.profile_path).map((cast, i) => (
                <div key={i}>
                  <div>
                    <img 
                      src={imageUrl + cast.profile_path} 
                      alt=""
                      className='w-24 h-24 object-cover rounded-full' 
                    />
                  </div>
                  <p className='font-bold text-center text-sm text-neutral-300'>{cast.name}</p>
                </div>
              ))
            }
          </div>

        </div>
      </div>

      <div>
        <HorizontalScroll data={detailsSimilarResponse && detailsSimilarResponse.results} heading={"Similar " + params?.explore} media_type={params?.explore} />
        <HorizontalScroll data={recommendResponse && recommendResponse.results} heading={"Recommendation " + params?.explore} media_type={params?.explore} />
      </div>
      {
        playVideo && (
          <VideoPlay data={playVideoId} close={() => setPlayVideo(false)} media_type={params?.explore} />
        )
      }
    </div>
  )
}

export default DetailsPage