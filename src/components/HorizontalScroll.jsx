import { useRef } from 'react';
import Card from './Card'
// icons
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';


const HorizontalScroll = ({data = [], heading, trending, media_type}) => {
    const containerRef = useRef();

    const handleNext = () => {
        containerRef.current.scrollLeft += 250
    }

    const handlePrev = () => {
        containerRef.current.scrollLeft -= 250
    }

  return (
    <div className='container mx-auto px-3 my-10'>
        <h2 className='text-xl lg:text-2xl mb-3 font-bold text-white'>{heading}</h2>
        <div className='relative group'>
            <div className='grid grid-cols-[repeat(auto-fit,230px)] grid-flow-col gap-6 overflow-hidden overflow-x-scroll relative scroll-smooth transition-all scrollbar-none' ref={containerRef}>
                {
                    data && data.map((data, index) => (
                        <Card key={data.id + "heading" + index} data={data} index={index+1} trending={trending} media_type={media_type} />
                    ))
                }
            </div>

            <div className='absolute top-0 w-full h-full items-center hidden justify-between px-4 group-hover:lg:flex'>
                <button onClick={handlePrev} className='bg-white p-1 rounded-full text-2xl z-20 text-black'>
                    <FaAngleLeft/>
                </button>
                <button onClick={handleNext} className='bg-white p-2 rounded-full text-2xl z-20 text-black'>
                    <FaAngleRight/>
                </button>
            </div>
        </div>
    </div>
  )
}

export default HorizontalScroll