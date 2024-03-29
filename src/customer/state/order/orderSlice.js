import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { API_BASE_URL } from "../../../config/apiConfig";
import axios from "axios";

const initialState={
    order:null,
    error:null,
    loading:false
}

 export const createOrder = createAsyncThunk('createOrder',async(orderData,thunkAPI)=>{
    const token = localStorage.getItem('jwt');
    const {address,navigate} = orderData
    try {
        const response = await axios.post(`${API_BASE_URL}/api/orders/`,address,{
            headers: {
                authorization: token
            }
        });
        const order =  response.data;
         if (order._id){
            navigate({search:`step=3&order_id=${order._id}`})
        }
        return order;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }

})
 export const getOrderById = createAsyncThunk('getOrderById',async(id,thunkAPI)=>{
    const token = localStorage.getItem('jwt');
    try {
        const response = await axios.post(`${API_BASE_URL}/api/orders/${id}`, data,{
            headers: {
                authorization: token
            }
        });
        const order = response.data;
        return order;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }

})

const orderReducer = createSlice({
name:'order',
initialState,
extraReducers:{
[createOrder.pending]:(state)=>{
    state.loading= true
},
[createOrder.fulfilled]:(state ,action)=>{
    console.log("ddd");
    state.order = action.payload
    state.loading= false
},
[createOrder.rejected]:(state ,action)=>{
    console.log("uu");
    state.error = action.payload
    state.loading= false
},

}
})
export default orderReducer.reducer