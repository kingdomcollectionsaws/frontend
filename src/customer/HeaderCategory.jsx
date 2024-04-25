import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { FiMenu } from "react-icons/fi";
import c1 from "../../public/c1.png"
import c2 from "../../public/c2.png"
import c3 from "../../public/c3.png"
import c4 from "../../public/c4.png"
import c5 from "../../public/c5.png"
import c6 from "../../public/c6.png"
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function HeaderCategory() {
    const CategoryList = [{
        slug:"gladiator-costume",
        name:"Gladiator Costume",
        image:c1
      },
      {
        slug:"mf-doom-mask",
        name:"Mf doom mask",
        image:c2
      },
      {
        slug:"nazgul-costume",
        name:"Nazgul costume",
        image:c3
      },
      {
        slug:"roman-costume",
        name:"Roman costume",
        image:c4
      },
      {
        slug:"spartan-costume",
        name:"Spartan costume",
        image:c5
      },
      {
        slug:"templar-costume",
        name:"Templar costume",
        image:c6
      }
    ]
  return (
    <Menu as="div" className="relative inline-block text-left" >
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
            {
                CategoryList?.map((i)=>(
                    <Menu.Item>
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
