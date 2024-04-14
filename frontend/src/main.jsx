import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Layout from './layout.jsx'
import Public from './components/public.jsx'
import LikedEvents from './components/likedEvents.jsx'
import YourEvents from './components/yourEvents.jsx'
import Profile from './components/profile.jsx'
import UserContextProvider from './context/UserContextProvider.jsx'
import Login from './components/login.jsx'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element= {<Layout />}>
      <Route path='events' element= {<Public />} />
      <Route path='likedevents' element= {<LikedEvents />} />
      <Route path='yourevents' element= {<YourEvents />} />
      <Route path='profile' element= {<Profile />} />
      <Route path='login' element= {<Login />} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <UserContextProvider>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </UserContextProvider>,
)
