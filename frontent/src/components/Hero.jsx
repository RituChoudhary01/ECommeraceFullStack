import React from 'react'
import { assets } from '../assets/frontend_assets/assets'

function Hero() {
  return (
    <div className='flex flex-col sm:flex-row border border-gray-400 w-full h-auto'>
      {/* Hero Left Side */}
      <div className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0 px-6 bg-white'>
        <div className='text-[#414141] max-w-md'>
          <div className='flex items-center gap-2 mb-3'>
            <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
            <p className='font-medium text-sm md:text-base'>OUR BESTSELLERS</p>
          </div>
          <h1 className='prata-regular text-3xl lg:text-5xl leading-relaxed mb-4'>
            Latest Arrivals
          </h1>
          <div className='flex items-center gap-2 cursor-pointer'>
            <p className='font-semibold text-sm md:text-base'>SHOP Now</p>
            <p className='w-8 md:w-11 h-[1px] bg-[#414141]'></p>
          </div>
        </div>
      </div>

      {/* Hero Right Side */}
      <div className='w-full sm:w-1/2 h-full'>
        <img
          className='w-full h-full object-cover'
          src={assets.hero_img}
          alt="Hero"
        />
      </div>
    </div>
  )
}

export default Hero
