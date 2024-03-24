import React from 'react'
import Addresscard from '../addresscard/Addresscard';
import Stepperorder from './Stepperorder'
import StarBorderIcon from '@mui/icons-material/StarBorder';
export default function OderDetail() {
  return (
    <>
 <div>
 <div className='px-10'>
        <h1 className='font-bold text-lg mb-5'>Delivery Address</h1>
        <Addresscard/>
    </div>
    <div className='py-20'>
        <Stepperorder activeStep={2}/>
    </div>
    <div className='p-5'>
    <div className='flex align-center justify-around border shadow-lg mt-8 cursor-pointer '>
  <div className=' rounded-sm flex align-center justify-around  '>
<div className='w-[10rem] h-[10rem]'>
<img className='object-cover border rounded-lg' src="https://cdn.vox-cdn.com/thumbor/8RqXE7Vh-GprcnoKZpl_HX2P2P0=/0x0:2040x1360/768x768/filters:focal(1020x680:1021x681)/cdn.vox-cdn.com/uploads/chorus_asset/file/24371433/236492_MacBook_Pro_16__2023__AKrales_0141.jpg" alt="img" />
</div>
<div className='mx-5'>
<p className='font-bold mb-2'>laptop</p>
  <p>256gb <span>red </span></p>
  <p className='font-semibold mb-2'>$1234</p>
  <p className='font-bold'>delivery on may</p>
  <p>item deliverd</p>
</div>
  </div>
<div className='flex align-center justify-center pt-10 text-blue-500'>
 <StarBorderIcon/><span>Rate & Review</span>
</div>
</div>
    </div>
 </div>
    </>
  )
}
