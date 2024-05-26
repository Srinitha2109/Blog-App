import React from 'react'
import NavBar from './Navbar';
import { Outlet } from 'react-router-dom';
import Footer from './Footer'
function RootLayout() {
  return (
    <div>
        <NavBar/>
        <div style={{minHeight:"85vh"}}>
        <Outlet/>
        </div>
       
        <Footer/>
    </div>
  )
}

export default RootLayout
