import React from 'react';
import { NavLink } from 'react-router-dom';
import addIcon from 'C:/Users/kaush/OneDrive/Desktop/Folders/coding/GreatStack/Admin/admin/src/assets/forever-assets/assets/admin_assets/add_icon.png'
import orderIcon from 'C:/Users/kaush/OneDrive/Desktop/Folders/coding/GreatStack/Admin/admin/src/assets/forever-assets/assets/admin_assets/order_icon.png'

const Sidebar = () => {
  return (
    <div className='w-[18%] min-h-screen border-r-2'>
      <div className='flex flex-col gap-4 pt-6 pl-[20%] text-[15px]'>
        <NavLink to='/add' className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l-2xl' >
            <img className='w-5 h-5' src={addIcon} alt="" />
            <p className='hidden md:block'>Add items</p>
        </NavLink>
        <NavLink to='/list' className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l-2xl' >
            <img className='w-5 h-5' src={orderIcon} alt="" />
            <p className='hidden md:block'>List items</p>
        </NavLink>
        <NavLink to='/orders' className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l-2xl' >
            <img className='w-5 h-5' src={orderIcon} alt="" />
            <p className='hidden md:block'>Orders</p>
        </NavLink>
      </div>
    </div>
  )
}

export default Sidebar
