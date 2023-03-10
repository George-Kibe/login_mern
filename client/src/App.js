import React from 'react'
import {createBrowserRouter,RouterProvider} from "react-router-dom"

//import pages
import Login from './pages/Login';
import Password from './pages/Password';
import Profile from './pages/Profile';
import Register from './pages/Register';
import Recover from './pages/Recover';
import Reset from './pages/Reset';
import PageNotFound from './pages/PageNotFound';
//Auth middleware
import { AuthorizeUser, ProtectRoute } from './middlewares/auth';

const router = createBrowserRouter([
  {
    path:"/",
    element: <Login/>
  },
  {
    path:"/register",
    element: <Register/>
  },
  // {
  //   path:"/login",
  //   element: <Login/>
  // },
  {
    path:"/password",
    element: <ProtectRoute><Password/></ProtectRoute>
  },
  {
    path:"/profile",
    element: <AuthorizeUser><Profile/></AuthorizeUser>
  },
  {
    path:"/recover",
    element: <Recover/>
  },
  {
    path:"/reset",
    element: <Reset/>
  },
  {
    path:"*",
    element: <PageNotFound/>
  },
])

const App = () => {
  return (
    <main>
      <RouterProvider router={router}></RouterProvider>
    </main>
  )
}

export default App