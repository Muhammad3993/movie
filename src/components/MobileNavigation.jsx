import React from 'react'
import { mobileNavigation } from '../constants/navigation'
import { NavLink } from 'react-router-dom'

const MobileNavigation = () => {
  return (
    <section className='lg:hidden h-14 bg-black bg-opacity-70 backdrop-blur-2xl fixed bottom-0 w-full z-30'>
        <div className='flex items-center justify-between h-full text-neutral-400'>
            {
                mobileNavigation.map((item, index) => (
                    <NavLink 
                        to={item.href} 
                        key={index}
                        className={({isActive}) => `px-3 flex h-full items-center flex-col justify-center ${isActive && "text-white"}`}
                    >
                        <div className='text-2xl'>{item.icon}</div>
                        <p className='text-sm'>{item.title}</p>
                    </NavLink>
                ))
            }
        </div>
    </section>
  )
}

export default MobileNavigation