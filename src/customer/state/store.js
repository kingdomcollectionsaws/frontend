import { configureStore } from '@reduxjs/toolkit'
import auth    from './Auth/registerSlice'
import productReducer from './product/productSlice'
import  cartReducer  from './cart/cartSlice'
import orderSlice from './order/orderSlice'
import  categoriesReducer  from './category/categorySlice'
export const store = configureStore({
    reducer: {
        user:auth,
        allproducts:productReducer,
        cart:cartReducer,
        order:orderSlice,
        categories:categoriesReducer
      },
})