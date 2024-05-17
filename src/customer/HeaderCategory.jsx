import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { FiMenu } from "react-icons/fi";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function HeaderCategory() {
  const navigate = useNavigate()
  const { categories, loading } = useSelector(store => store.categories);
  return (
    <Menu as="div" className="relative inline-block text-left z-[1000]" >
      <div>
        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" >
         
        <FiMenu style={{fontSize:'1.5rem'}} />
        
          Categories
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
        <Menu.Items className="fixed right-99 z-100 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <a className=' mx-5 text-gray-700 cursor-pointer hover:bg-gray-200' href='/products/all'>All Products</a>
            {
                categories?.map((i,index)=>(
                    <Menu.Item key={index}>
                    {({ active }) => (
                      <a
                      
                        href={`/products/${i.slug}`}
                        className={classNames(
                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                          'block px-4 py-2 text-sm'
                        )}
                      >
                        {i.name}
                      </a>
                    )}
                  </Menu.Item> 
                ))
                
            }
          
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
