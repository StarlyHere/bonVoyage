import React from 'react'

export default function DataSection({trip}) {
  return (
    <div>
        <img src='/placeholder.jpg' className='w-full h-[340px] object-cover rounded-xl'/>
        <div className='my-5 flex flex-col gap-2'>
            
            <h2 className='font-bold text-2xl'>
                {trip?.UserSelection?.location}
            </h2>

            <div className='flex gap-5'>
                <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-lg'>
                🗓️ {trip?.UserSelection?.noOfDays} Days
                </h2>
                <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-lg'>
                💲 {trip?.UserSelection?.budget}
                </h2>
                <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-lg'>
                🧳 {trip?.UserSelection?.traveler}
                </h2>
            </div>
        </div>
    
    </div>
  )
}
