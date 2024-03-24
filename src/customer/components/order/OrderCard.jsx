import React from 'react'
import AlbumIcon from '@mui/icons-material/Album';
import {  useNavigate } from 'react-router-dom';
export default function OrderCard() {
  const navigate = useNavigate()
  return (
    <>
<div onClick={()=>navigate(`/account/order/${2}`)}  className='flex align-center justify-around border shadow-lg mt-8 hover:scale-105'>
  <div className='w-[10rem] h-[10rem] rounded-sm sm:w-[5rem] sm:h-[5rem]'>
<img className='object-cover border rounded-lg' src="https://cdn.vox-cdn.com/thumbor/8RqXE7Vh-GprcnoKZpl_HX2P2P0=/0x0:2040x1360/768x768/filters:focal(1020x680:1021x681)/cdn.vox-cdn.com/uploads/chorus_asset/file/24371433/236492_MacBook_Pro_16__2023__AKrales_0141.jpg" alt="img" />
  </div>
<div className='flex flex-col '>
  <p className='font-bold mb-2'>laptop</p>
  <p>256gb</p>
  <p>red</p>
  <p className='font-semibold mb-2'>$1234</p>
  <p className='font-bold'><span><AlbumIcon className='w-[1rem] h-[1rem] text-green-500'/></span>delivery on may</p>
  <p>item deliverd</p>
</div>
</div>
    </>
  )
}
