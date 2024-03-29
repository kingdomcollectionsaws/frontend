import { createAsyncThunk, createSlice,} from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL } from "../../../config/apiConfig";
const initialState = {
    cart:null,
    loading:false,
    error:null,
}

 export const getCart = createAsyncThunk('getCart',async(thunkAPI)=>{
    const token = localStorage.getItem('jwt');
  
    try {  const response = await axios.get(`${API_BASE_URL}/api/cart/`,{
        headers:{
            authorization:token
        }
    })
        const cart =  response.data;
        
        return cart
        
        
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data)
    }
 })
 export const addItemInCart = createAsyncThunk('addItemInCart', async (data, thunkAPI) => {
    const token = localStorage.getItem('jwt');
    try {
        const response = await axios.put(`${API_BASE_URL}/api/cart/add/`,data, {
            headers: {
                authorization: token
            }
        });
        const cart = await response.data;
        return cart;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

export const updateItemInCart = createAsyncThunk('updateItemInCart', async (data, thunkAPI) => {
    const {id,quantity,sizes} = data
    const token = localStorage.getItem('jwt');
    try {
        const response = await axios.put(`${API_BASE_URL}/api/cart_items/${id}` ,{quantity:quantity,sizes:sizes},{
            headers: {
                authorization: token
            }
        });
        const item = await response.data;
        return item;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});
export const removeItemInCart = createAsyncThunk('removeItemInCart', async (id, thunkAPI) => {
    const token = localStorage.getItem('jwt');
    try {
        const response = await axios.delete(`${API_BASE_URL}/api/cart_items/${id}`, {
            headers: {
                authorization: token
            }
        });
        const item = response.data;
        return item;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

export const cartReducer = createSlice({
    name:'cart',
    initialState,
    extraReducers:{
        [getCart.pending]:(state,action)=>{
          
            state.loading = true
        },  
        [getCart.fulfilled]:(state,action)=>{
          
            state.cart = action.payload
            state.loading = false
        },
        [getCart.rejected]:(state,action)=>{
            state.loading= false
            state.error = action.payload
        },
        [addItemInCart.pending]:(state,action)=>{
          
            state.loading = true
        },  
        [addItemInCart.fulfilled]:(state,action)=>{
           
            state.loading = false
        },
        [addItemInCart.rejected]:(state,action)=>{
            console.log("kk");
            state.loading= false
            state.error = action.payload
        },
        [updateItemInCart.pending]:(state,action)=>{
            
            state.loading = true
        },
        
        [updateItemInCart.fulfilled]:(state,action)=>{
            state.loading= false
            console.log(action.payload);
            //   state.cartItems = action.payload
            localStorage.removeItem('value');
        },
        [updateItemInCart.rejected]:(state,action)=>{
            state.loading= false
            state.error = action.payload
        },
        [removeItemInCart.pending]:(state,action)=>{
            state.loading = true
        },
        [removeItemInCart.fulfilled]:(state,action)=>{
           console.log('re',action.payload);
           state.loading= false
        },
        [removeItemInCart.rejected]:(state,action)=>{
          state.error = action.payload
          state.loading= false
        },
    }
})
export default cartReducer.reducer