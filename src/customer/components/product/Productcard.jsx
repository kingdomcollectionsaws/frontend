import React from 'react'
import './productcart.css'
import { useNavigate } from 'react-router-dom'
export default function Productcard({product}) {
    const navigate= useNavigate()
  return (
    <>
        <div onClick={()=>navigate(`/product/${2}`)} className='productcard   w-[17rem] m-3 transition-all cursor-pointer '>
            <div className='h-[12rem]'>
                <img className='h-full w-full object-cover object-left-top py-1' src={product.imageUrl} alt="img" />
            </div>
            <div className='textpart bg-white p-3 '>
                <div >
                    <p className='font-bold opacity-60'>{product.brand}</p>
                    <p className='font-semibold opacity-90'>{product.title}</p>
                    <p>{product.details}</p>
                    <p>{product.color}</p>
                </div>
                <div className='flex items-center space-x-2' >
                    <p className='font-semibold'>{product.price}</p>
                    <p className='line-through opacity-50'>{product.price/100*110}</p>
                    <p className='text-green-600 font-semibold '>10% off</p>

                </div>

            </div>

        </div>

    </>
  )
}
