import { useState } from 'react'
import { Button } from "@/components/ui/button"
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Hero from './components/ui/custom/Hero'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    {/*hero section*/}
    <Hero/>
    </>
  )
}

export default App
