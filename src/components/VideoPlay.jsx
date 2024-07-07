import React, { useEffect, useState } from 'react'
import { IoClose } from 'react-icons/io5'
import { videoApi } from '../data/videoApi'

const VideoPlay = ({data, close, media_type}) => {


    const [videoResponse, setVideoResponse] = useState(null);

    const getVideoPlay = async () => {
        const response = await videoApi.getVideoApi(media_type, data.id)
        setVideoResponse(response)
    }

    useEffect(() => {
        getVideoPlay();
    }, [])


    return (
        <section className='w-full h-full fixed bg-neutral-700 top-0 right-0 left-0 z-40 bg-opacity-50 flex justify-center items-center'>
            <div className='bg-black w-full  lg:h-[80vh] max-w-screen-2xl aspect-video rounded relative'>

                <button onClick={close} className='absolute right-0 -top-10 text-3xl'>
                    <IoClose/>
                </button>

                <iframe 
                    src={`https://www.youtube.com/embed/${videoResponse?.results[0]?.key}`} 
                    className='w-full h-full'    
                />
            </div>
        </section>
    )
}

export default VideoPlay