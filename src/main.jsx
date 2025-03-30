import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter } from 'react-router-dom'
import { RouterProvider } from 'react-router'
import { GoogleOAuthProvider } from '@react-oauth/google'
import CreateTrip from './create-trip'
import Header from './components/ui/custom/Header'
import Viewtrip from './view-trip/[tripID]'

const router = createBrowserRouter([
  {
  path:"/",
  element:<App/>,
  },

  {
    path:'/create-trip',
    element:<CreateTrip/>,
  },{
    path:'/view-trip/:tripID',
    element:<Viewtrip/>,
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
      <Header/>
      <RouterProvider router={router}/>
    </GoogleOAuthProvider>;
  </StrictMode>,
)


