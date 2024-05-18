import React,{useEffect} from 'react'
import { Fragment, useState } from 'react'
import { Dialog,  Menu, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon} from '@heroicons/react/20/solid'
import {  useNavigate,} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts } from './state/product/productSlice'
import { getCategories } from './state/category/categorySlice'
import style from './components/custom/styles.module.css'
  export default function Mainproducts() {
    
    const { products,loading } = useSelector(store => store.allproducts);
    const { categories} = useSelector(store => store.categories);
  const dispatch = useDispatch()
  const navigate = useNavigate()
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('ALL');
    const [allproducts, setAllproducts] = useState([]);

   useEffect(()=>{
   dispatch(getAllProducts())
   dispatch(getCategories());
  
   if(selectedCategory == 'All'){
    setAllproducts(products)
   }else{
    setAllproducts(products.filter((i)=> i.category == selectedCategory))
   }
   console.log(allproducts);
    },[selectedCategory])
    
    useEffect(() => {
      if (products.length > 0) {
        setAllproducts(products);
      }
    }, [products]);
return (
    <>
    <div className="bg-white">
      <div>
        {/* Mobile filter dialog */}
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog as="div" className="relative z-100 lg:hidden" onClose={setMobileFiltersOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 z-100 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                  <div className="flex items-center justify-between px-4">
                    <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                    <button
                      type="button"
                      className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-500"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Filters */}
                  <form className="mt-4 border-t border-gray-200">
                    <h3 className="sr-only">Categories</h3>
                    <ul role="list" className="px-2 py-10 font-medium text-gray-900 ">
                      {categories?.map((item) => (
                        <li key={item.name} className='cursor-pointer my-10'  onClick={()=>{setAllproducts(products.filter((i)=> i.category == item.slug));setMobileFiltersOpen(false)}} >
                          
                            {item.name}
                          
                        </li>
                      ))}
                    </ul>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
            <h1 className="text-xl font-bold tracking-tight text-gray-900 cursor-pointer" onClick={()=>setAllproducts(products)}>All Products</h1>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left  z-100">
                <div>
                  <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort
                    <ChevronDownIcon
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
               
                  <Menu.Items className="absolute right-0 z-100 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      
                        <Menu.Item >
                         
                            <p
                             
                              className={
                                'font-medium text-gray-900 cursor-pointer text-gray-500 p-2 hover:bg-gray-200' 
                                
                              }
                            >
                             Price: High to Low
                            </p>
                        
                        </Menu.Item>
                        <Menu.Item >
                         
                         <p
                          
                          className={
                            'font-medium text-gray-900 cursor-pointer text-gray-500 p-2 hover:bg-gray-200' 
                            
                          }
                         >
                          Price: High to Low
                         </p>
                     
                     </Menu.Item>
               
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters */}
       
              <form className="hidden lg:block">
                
                <ul role="list" className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900">
               
                  {categories?.map((item) => (
                    <li key={item.name} className='cursor-pointer'   onClick={()=>{setAllproducts(products.filter((i)=> i.category == item.slug));setSelectedCategory(i.slug)}} >
                      {item.name}
                    </li>
                  ))}
                </ul>
               
              </form>

              {/* Product grid */}
              <div className="lg:col-span-3 w-full " >
                <div className='flex flex-wrap justify-center  '  >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'row', flexWrap: 'wrap', gap: '4px', }}>
              {
                allproducts?.map((i, index) => (
                  
                    <div className={style.gitfProduct} style={{ padding: '0', borderRadius: '.5rem', border: 'none', }} onClick={() => navigate(`/product/${i.slug}/${i._id}`)} key={index} >
                      <img src={i?.variations[0].images[0]} alt='img' className='lg:w-[15rem] lg:h-[15rem]' style={{ borderRadius: '.5rem', }} />

                      <h1 className={style.text} style={{ fontWeight: '700', width: '90%', fontSize: '1rem', display: 'flex', alignSelf: "flex-start", cursor: 'pointer' }} onClick={() => navigate(`/product/${i._id}`)}>{i.title.substring(0, 12)}...</h1>
                      <h1 className={style.text} style={{ fontWeight: '800', width: '90%', fontSize: '1rem', display: 'flex', alignItems: 'center', color: '#16A34A', }}> ${i?.variations[0].discountedPrice}<span><p className=' tracking-tight text-gray-600  line-through px-2 ' style={{ fontSize: '15px', fontWeight: '300', paddingTop: '1px' }}>${i?.variations[0].price}</p></span> </h1>


                    </div>
                ))
              }
            </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
    </>
  )
}
