import React from 'react'
import { useSelector } from 'react-redux'

export default function Addresscard() {
  
const {user,loading} = useSelector(store => store.user);
const address =  user?.addresses;

console.log(address,user);
  return (
    !loading? 
    <>
   { address?
        <div>
      <div >
        <p  className='font-bold mb-2'>{address?.firstName} {address?.lastName}</p>
        <p  className='font-semibold mb-2'>{address?.streetAddress}</p>
      </div>
<div>
<p  className='font-bold mb-2'>{address?.city}</p>
  <p  className='font-bold mb-2'>{address?.state}</p>
  <p  className='font-semibold mb-2'>{address?.zipCode}</p>
  <p  className='font-semibold mb-2'>{address?.mobile}</p>
  <p  className='font-semibold mb-2'>{address?.email}</p>
  <p  className='font-semibold mb-2'>{address?.country}</p>
</div>

    </div>:<p  className='font-semibold mb-2'>No address saved</p>}
    </>:<p  className='font-semibold mb-2'>No address saved</p>
  )
}
