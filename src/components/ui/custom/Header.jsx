import React from 'react'
import { Button } from '../button'

function Header() {
  return (
    <div className='p-2 bg-transparent fixed top-0 w-full flex justify-between items-center px-5 z-10'>
        <img src='/logo.svg' alt="Logo" className="h-12" />
        <div>
            <Button>Sign In</Button>
        </div>
    </div>
  )
}

export default Header