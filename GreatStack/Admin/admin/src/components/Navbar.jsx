import React from 'react';
import assets from 'C:/Users/kaush/OneDrive/Desktop/Folders/coding/GreatStack/Admin/admin/src/assets/forever-assets/assets/admin_assets/logo.png';

const Navbar = ({setToken}) => {
  return (
    <div className='flex items-center py-2 px-[4%] justify-between'>
      <img className='w-[max(10%,80px)]' src={assets} alt="logo" />
      <button onClick={()=>setToken('')} className='bg-gray-600 text-white px-5 py-2 sm:py-2 rounded-full text-xs sm:text-sm'>Logout</button>
    </div>
  )
}

export default Navbar
