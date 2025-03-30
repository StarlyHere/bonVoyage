import React from 'react';
import { Link } from 'react-router-dom'; 
import { Button } from '../button';

function Hero() {
  return (
    <div 
      className="min-h-screen w-full bg-cover bg-center flex flex-col items-center justify-center"
      style={{ backgroundImage: "url('/ocean.jpg')" }}
    >
      <div className='flex flex-col items-center mx-8 md:mx-56 gap-9 bg-[#D9D9D9] bg-opacity-20 p-10 rounded-lg'>
        <h1 className='font-extrabold text-[50px] text-center mt-4'>
          <span className='text-[#D9D9D9]'>Discover Your Next Adventure</span>
        </h1>
        <p className='text-xl text-[#D9D9D9] text-center'>
          Your personal travel planner
        </p>

        <Link to={'/create-trip'}>
          <Button className="bg-[#007A8C]">Get Started, It's</Button>
        </Link>
      </div>
    </div>
  );
}

export default Hero;
