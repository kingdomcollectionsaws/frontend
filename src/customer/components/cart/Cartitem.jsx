import { AddCircleOutlineOutlined,RemoveCircleOutlineOutlined } from '@mui/icons-material'
import { Button, IconButton } from '@mui/material'
import React from 'react'

export default function Cartitem({cartItems}) {
  return ( 
     <>{
      cartItems.map((i)=>(
        <div className='border mb-3'>
    <div className='flex align-center mx-3 mt-10  space-x-5'>
        <img className='max-w[10rem] max-h-[10rem] flex align-center mx-4'  src="https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg" alt="img" />
       <div className='flex align-center justify-center flex-col' >
<p>name</p>
<p>brand</p>
<p>storage</p>
<div className="flex align-center justify-start m-y-1 space-x-2">
            <p className=' font-semibold tracking-tight  '>$120</p>
            <p className='font-semibold tracking-tight text-gray-600  line-through '>$150</p>

            <p className=' font-semibold tracking-tight   text-green-600'>30% off</p>

          </div>
       </div>
       <div>
       </div>
     
    </div>
      <div className='flex align-center justify-center mx-3  space-x-5'>
    <IconButton>
        <RemoveCircleOutlineOutlined sx={{color:"RGB(145 85 253)"}}/>
    </IconButton>
    <span className='py-[5px] px-3 border rounded-sm ]'>3</span>
<IconButton>
        <AddCircleOutlineOutlined sx={{color:"RGB(145 85 253)"}}/>
    </IconButton>
    <div>
      <Button sx={{color:"RGB(145 85 253)"}}>remove</Button>
    </div>
      </div>
    </div>
      ))
     }
     </>
  )
}
