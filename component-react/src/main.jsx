import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter,createRoutesFromElements,redirect,Route,RouterProvider } from "react-router-dom";
import App from './App.jsx'

const router = createBrowserRouter([
  {
    path:'/',Component:App,children:[
      {path:'dashboard',Component:App,loader:()=>{return redirect('/')}}
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}  />
  </React.StrictMode>,
)
