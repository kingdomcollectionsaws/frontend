import { Grid } from '@mui/material'
import React from 'react'
import OrderCard from './OrderCard'

export default function Order() {
  const orderfliters=  [
    {label:"On the way", value:"on_the_way"},
    {label:"Delivered", value:"delivered"},
    {label:"Cancelled", value:"cancelled"},
    {label:"Returned",value:"returned"}
  ]
  return (
    <>
    <Grid container sx={{justifyContent:"space-between"}} className='sm:justify-center'>
        <Grid item lg={2.5}  xs={12} className='sticky top-1 bg-white' >
        <h1 className='flex align-center justify-center mt-2 font-bold'>Fliters</h1>    
           <div className='h-auto shadow-lg p-5 static top-3'>
            <p>Order Status</p>
           {
            orderfliters.map((option)=>(
                <div className='space-x-3 font-semibold'>
                
                <input type="checkbox" className='cursor-pointer' defaultValue={option.value} />
                <label htmlFor={option.value} className='ml-3 text-sm text-gray-600'>
                    {option.label}

                </label>

            </div>
            ))
           }
           </div>
           

        </Grid>
        <Grid item xs={12} lg={9} className='cursor-pointer '>
            <OrderCard/>
            <OrderCard/>
            <OrderCard/>
            <OrderCard/>
        </Grid>

    </Grid>
    </>
  )
}
