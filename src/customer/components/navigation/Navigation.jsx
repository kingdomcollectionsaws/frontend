import { Fragment, useEffect, useState } from "react";
import { Dialog, Popover, Tab, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Avatar, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AuthModel from "../../auth/AuthModel";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetail } from "../../state/Auth/registerSlice";
import { logout } from "../../state/Auth/registerSlice";
import { findProductById, getAllProducts } from "../../state/product/productSlice";
import { API_BASE_URL } from "../../../config/apiConfig";
import { addItemInCart, getCart, removeItemInCart, updateItemInCart } from "../../state/cart/cartSlice";
const navigation = {
  categories: [
    {
      id: "all",
      name: "All",
      featured: [
        {
          name: "iphone 15 pro max",
          href: "#",
          imageSrc:
            "https://i.gadgets360cdn.com/products/large/iphone-15-plus-553x800-1694549227.jpg",
          imageAlt:
            "Models sitting back to back, wearing Basic Tee in black and bone.",
        },
        {
          name: "sumsung s23 ultra",
          href: "#",
          imageSrc:
            "https://i.gadgets360cdn.com/products/large/iphone-15-plus-553x800-1694549227.jpg",
          imageAlt:
            "Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.",
        },
      ],
      sections: [
        {
          id: "laptops",
          name: "Laptops",
          items: [
            { name: "Dell", href: "#" },
            { name: "HP", href: "#" },
            { name: "Apple", href: "#" },
          ],
        },
        {
          id: "SmartPhone",
          name: "Smart Phone",
          items: [
            { name: "Apple", href: "#" },
            { name: "Sumsung", href: "#" },
            { name: "realme", href: "#" },
            { name: "vivi", href: "#" },
            { name: "mi", href: "#" },
            { name: "one plus", href: "#" },
          ],
        },
        {
          id: "Gadgets",
          name: "Gagets",
          items: [
            { name: "Air bird", href: "#" },
            { name: "Moniter", href: "#" },
            { name: "Head phone", href: "#" },
            { name: "Charger", href: "#" },
            { name: " Other", href: "#" },
          ],
        },
      ],
    },
  ],
  pages: [
    { name: "Laptos", href: "#" },
    { name: "Smart Phone", href: "#" },
    { name: "Gadgets", href: "#" },
  ],
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navigation() {
  const dispatch = useDispatch();
  const {user} = useSelector(store => store.user);
  const allproducts= useSelector(store => store.allproducts);
  const cart= useSelector(store => store.cart);

  const [open, setOpen] = useState(false);
  const [handleOpenAuth,setHandleOpeneAuth]= useState(false);
  const [smallmenu, setSmallmenu] = useState(false);

 
    useEffect(() => {
      // dispatch(removeItemInCart('65f029876502f35a6c5f0dab'))
      // dispatch(addItemInCart({"productId":"65eec61214825f86ad6eea79"}))
      // dispatch(updateItemInCart('65f029876502f35a6c5f0dab'))
       //dispatch(getCart())
  dispatch(getAllProducts());
  console.log(allproducts);
   dispatch(findProductById('65feb71a87b5901787deae6d'))
 

      if (!user.firstName) {
        dispatch(getUserDetail());
      }
},[user])
  
  const handleClose = ()=>{
    setHandleOpeneAuth(false)
    navigate("/")
  }
  useEffect(() => {
  if(user){
    handleClose()
  }
  }, [user])
  
  const handlesmallmenu = ()=>{
    if(smallmenu == true){
      setSmallmenu(false)
    }else{
      setSmallmenu(true)
    }
 
  }
  const handleOpen = ()=>{
    setHandleOpeneAuth(true)
  }
  const logouthandle = ()=>{
dispatch(logout())
localStorage.clear();
setSmallmenu(false)
// window.location.reload();
  }
  const navigate = useNavigate();
  const handlecategory = (section,  item) => {
    navigate(`/${item.name}/${section.id}`);
  };
  return (
    <>
    <div className="bg-white relative"  style={{ zIndex: 9999 }}>
      {/* Mobile menu */}
      <Transition.Root show={open} as={Fragment}>
        
        <Dialog as="div" className="relative z-90 lg:hidden" onClose={setOpen}>
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

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                <div className="flex px-4 pb-2 pt-5">
                  <button
                    type="button"
                    className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                    onClick={() => setOpen(false)}
                  >
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Links */}
                <Tab.Group as="div" className="mt-2">
                  <div className="border-b border-gray-200">
                    <Tab.List className="-mb-px flex space-x-8 px-4">
                      {navigation.categories.map((category) => (
                        <Tab
                          key={category.name}
                          className={({ selected }) =>
                            classNames(
                              selected
                                ? "border-indigo-600 text-indigo-600"
                                : "border-transparent text-gray-900",
                              "flex-1 whitespace-nowrap border-b-2 px-1 py-4 text-base font-medium"
                            )
                          }
                        >
                          {category.name}
                        </Tab>
                      ))}
                    </Tab.List>
                  </div>
                  <Tab.Panels as={Fragment}>
                  <div className="space-y-6 border-t border-gray-200 px-4 py-6"
               
               > 
                </div>
                    {navigation.categories.map((category)=>(
                      <Tab.Panel 
                        key={category.name}
                        className="space-y-10 px-4 pb-8 pt-10 z-90"
                      >
                        {category.sections.map((section) => (
                          <div key={section.name}>
                            <p
                              id={`${category.id}-${section.id}-heading-mobile`}
                              className="font-medium text-gray-900"
                            >
                              {section.name}
                            </p>
                            <ul
                              role="list"
                              aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                              className="mt-6 flex flex-col space-y-6"
                            >
                              {section.items.map((item) => (
                                <li key={item.name} className="flow-root">
                                  <a
                                    href={item.href}
                                    className="-m-2 block p-2 text-gray-500"
                                  >
                                    {item.name}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </Tab.Panel>
                    ))}
                  </Tab.Panels>
                </Tab.Group>

                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                  {navigation.pages.map((page) => (
                    <div key={page.name} className="flow-root">
                      <a
                        href={page.href}
                        className="-m-2 block p-2 font-medium text-gray-900"
                      >
                        {page.name}
                      </a>
                    </div>
                  ))}
                </div>
                <div className="space-y-6 border-t border-gray-200 px-4 py-6"
               
                >
                  <div className="flow-root" >
                    <p
                  
                      className="-m-2 block p-2 font-medium text-gray-900 hover:text-gray-900 hover:cursor-pointer"
                    >
                      log out
                    </p>
                  </div>
                 </div>
              </Dialog.Panel>
              
               
              
            </Transition.Child>
           
          </div>
        </Dialog>
     
      </Transition.Root>
      
      <header className="relative bg-white">
        <p className="flex h-10 items-center justify-center bg-indigo-600 px-4 text-sm font-medium text-white sm:px-6 lg:px-8">
          Get free delivery on orders over $100
        </p>

        <nav
          aria-label="Top"
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        >
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center">
              <button
                type="button"
                className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
                onClick={() => setOpen(true)}
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>
              {/* Logo */}
              <div className="ml-4 flex lg:ml-0">
                <a href="/">
                  <span className="sr-only">Your Company</span>
                  <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt=""
                  />
                </a>
              </div>

              {/* Flyout menus */}
              <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
                <div className="flex h-full space-x-8">
                  {navigation.categories.map((category) => (
                    <Popover key={category.name} className="flex">
                      {({ open }) => (
                        <>
                          <div className="relative flex">
                            <Popover.Button
                              className={classNames(
                                open
                                  ? "border-indigo-600 text-indigo-600"
                                  : "border-transparent text-gray-700 hover:text-gray-800",
                                "relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out"
                              )}
                            >
                              {category.name}
                            </Popover.Button>
                          </div>

                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <Popover.Panel className="absolute inset-x-0 top-full text-sm text-gray-500">
                              {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                              <div
                                className="absolute inset-0 top-1/2 bg-white shadow"
                                aria-hidden="true"
                              />

                              <div className="relative bg-white">
                                <div className="mx-auto max-w-7xl px-8">
                                  <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-16">
                                    <div className="row-start-1 grid grid-cols-3 gap-x-8 gap-y-10 text-sm">
                                      {category.sections.map((section) => (
                                        <div key={section.name}>
                                          <p
                                            id={`${section.name}-heading`}
                                            className="font-medium text-gray-900"
                                          >
                                            {section.name}
                                          </p>
                                          <ul
                                            role="list"
                                            aria-labelledby={`${section.name}-heading`}
                                            className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                          >
                                            {section.items.map((item) => (
                                              <li
                                                key={item.name}
                                                className="flex"
                                                onClick={() =>
                                                  handlecategory(
                  
                                                    section,
                                                    item
                                                  )
                                                }
                                              >
                                                <a
                                                  href={item.href}
                                                  className="hover:text-gray-800"
                                                >
                                                  {item.name}
                                                </a>
                                              </li>
                                            ))}
                                          </ul>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Popover.Panel>
                          </Transition>
                        </>
                      )}
                    </Popover>
                  ))}

                  {navigation.pages.map((page) => (
                    <a
                      key={page.name}
                      href={page.href}
                      className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                    >
                      {page.name}
                    </a>
                  ))}
                </div>
              </Popover.Group>

              <div className="ml-auto flex items-center">
                
                { user.firstName?
                <div className="relative mr-6">
                    <Avatar
                    onClick={handlesmallmenu}
                  className="text-white"
                  aria-haspopup="true"
                  sx={{
                    // bgcolor: deepPurple[500],
                    color: "white",
                    cursor: "pointer",
                  }}
                >
                  {user?user.firstName.slice(0,1).toUpperCase():'U'}
                  
                </Avatar>
           {smallmenu==true?<div  className="absolute w-[5rem] h-[5rem]   bg-black text-white border rounded-lg"
           >
            <ul className="flex flex-col m-1 align-center justify-center ">
           <li className="hover:cursor-pointer hover:text-blue-200 ">Profile</li>
           <li className="hover:cursor-pointer hover:text-blue-200 ">My order</li>
           <li className="hover:cursor-pointer hover:text-blue-200  " onClick={logouthandle}>Logout</li>
          </ul>
           </div>:" "}
                </div>
          
                :<div className=" lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  <p
                   
                    className="text-sm font-medium text-gray-700 hover:text-gray-900 hover:cursor-pointer" onClick={handleOpen}
                  >
                    Sign in
                  </p>
                  <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
            
                </div>
}
                {/* Search */}
                <div className="flex lg:ml-6">
                  <a href="#" className="p-2 text-gray-400 hover:text-gray-500">
                    <span className="sr-only">Search</span>
                    <MagnifyingGlassIcon
                      className="h-6 w-6"
                      aria-hidden="true"
                    />
                  </a>
                </div>

                {/* Cart */}
                <div className="ml-1 flow-root lg:ml-3">
                  <a href="#" className="group -m-2 flex items-center p-2">
                    <ShoppingBagIcon 
                    onClick={()=>navigate("/account/order")}
                      className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                      0
                    </span>
                    <span className="sr-only">items in cart, view bag</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
    <AuthModel  handleClose={handleClose} open={handleOpenAuth}/>
    </>
  );
}
