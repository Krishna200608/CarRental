import React, { useEffect } from 'react'
import NavbarOwner from '../../componets/owner/NavbarOwner'
import Sidebar from '../../componets/owner/Sidebar'
import { Outlet } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext'

const Layout = () => {

  const {isOwner, navigate} = useAppContext();

  // useEffect(() => {
  //   console.log(isOwner);
  //   if(!isOwner){
  //     navigate('/');
  //   }
  // }, [isOwner])

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