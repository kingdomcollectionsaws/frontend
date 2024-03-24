import React from 'react'
import Addresscard from '../addresscard/Addresscard'
import { Button, Grid,  } from '@mui/material'
import Cartitem from '../cart/Cartitem'
export default function Ordersummary() {
  return (
   <>
   <div className=''>
<div className='shadow-lg my-4 pl-5'>
<Addresscard/>   
  </div> 
<div className='lg:grid grid-cols-3 relative   '>

<div className='col-span-2 lg:w-[55vw] sm:w-[80vw]'>
{[1,2,3].map((i)=><Cartitem/>)}

</div>
<Grid className='sticky space-y-3 mt-7'>
 <div className='border '>
   <h1 className=' flex justify-center align-center font-bold'>Price Details</h1>
 <div className=' flex justify-around w-full  font-semibold pt-3'>
   <span>price</span>
   <span>$1000</span>
 </div>
   <div className=' flex justify-around w-full  font-mono pt-3'>
   <span>discount</span>
   <span className='text-green-500'>-$1000</span>
 </div>
   <div className=' flex justify-around w-full  font-mono pt-3'>
   <span>delivery charges</span>
   <span className='text-green-500'>free</span>
 </div>
   <div className=' flex justify-around w-full  font-mono pt-3'>
   <span>total amount</span>
   <span className='text-green-500'>$10000</span>
 </div>
 </div>
 <Button
         variant="container" className="w-full font-bold" sx={{bgcolor:"#9155fd",color:"#fff"}}
       >
        Pay
       </Button>
</Grid>

</div>
   </div>
   </>
  )
}
