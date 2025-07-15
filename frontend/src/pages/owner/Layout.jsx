import React from 'react'
import NavbarOwner from '../../componets/owner/NavbarOwner'
import Sidebar from '../../componets/owner/Sidebar'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className='flex flex-col'>
      <NavbarOwner/>
      <div className='flex'>
        <Sidebar/>
        <Outlet/>
      </div>
    </div>
  )
}

export default Layout