import React, { useEffect, useState } from 'react'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const BannerHome = () => {
    const {bannerData, imageUrl} = useSelector(state => state.movieData)

    const [currentImage, setCurrentImage] = useState(0);

    const handleNext = () => {
        if (currentImage < bannerData.length - 1) {
            setCurrentImage(currentImage+1)
        }
    }
    
    const handlePrev = () => {
        if(currentImage > 0){
            setCurrentImage(currentImage-1)
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            if (currentImage < (bannerData.length - 1)) {
                handleNext();
            } else {
                setCurrentImage(0);
            }
        },5000)

        return () => clearInterval(interval)
    }, [bannerData, imageUrl, currentImage])

  return (
    <section className='w-full h-full'>
        <div className='flex min-h-full max-h-[93vh] overflow-hidden'>
            {
                bannerData && bannerData.map((data, i) => (
                    <div key={i} className='min-w-full min-h-[350px] lg:min-h-full overflow-hidden relative group transition-all' style={{transform: `translateX(-${currentImage * 100}%)`}}>
                        <div className='min-w-full min-h-full'>
                            <img 
                                src={imageUrl + data.backdrop_path} alt="" 
                                className='h-full w-full object-contain'
                            />
                        </div>

                        <div className='absolute top-0 w-full h-full flex items-center hidden justify-between px-4 group-hover:lg:flex'>
                            <button onClick={handlePrev} className='bg-white p-2 rounded-full text-2xl z-10 text-black'>
                                <FaAngleLeft/>
                            </button>
                            <button onClick={handleNext} className='bg-white p-2 rounded-full text-2xl z-10 text-black'>
                                <FaAngleRight/>
                            </button>
                        </div>

                        <div className="absolute top-0 w-full h-full bg-gradient-to-t from-neutral-900 to-transparent"></div>

                        <div className='container mx-auto'>
                            <div className="w-full absolute bottom-0 max-w-md px-4">
                                <h2 className='font-bold text-2xl lg:text-4xl text-white drop-shadow-2xl'>{data?.title || data?.name}</h2>
                                <p className='text-ellipsis line-clamp-3 my-2'>{data.overview}</p>
                                <div className='flex items-center gap-4'>
                                    <p>Rating: {Number(data.vote_average).toFixed(1)}+</p>
                                    <span>|</span>
                                    <p>View: {Number(data.popularity).toFixed(0)}</p>
                                </div>
                                <Link to={`/${data?.media_type}/${data.id}`} className='bg-white px-4 py-2 text-black font-bold rounded flex mt-4 w-max hover:bg-gradient-to-l from-red-700 to-orange-500 shadow-md transition-all hover:scale-105'>Play Now</Link>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    </section>
  )
}

export default BannerHome