import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import ErrorPage from './ErrorPage.jsx'
import './index.css'
import { Hoy } from './components/sections/hoy/Hoy.jsx'
import { Avanzado } from './components/sections/avanzado/Avanzado.jsx'
import { Stats } from './components/sections/stats/Stats.jsx'
import { Admin } from './components/sections/admin/Admin.jsx'
import { Config } from './components/sections/config/Config.jsx'


import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom"

  const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <Hoy />
            },
            {
                path: "/avanzado",
                element: <Avanzado />
            },
            {
                path: "/stats",
                element: <Stats />
            },
            {
                path: "/admin",
                element: <Admin />
            },
            {
                path: "/config",
                element: <Config />
            }
        ]
    }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
        <RouterProvider router={router} />
  </React.StrictMode>,
)
