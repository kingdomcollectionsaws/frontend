import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { API_BASE_URL } from "../../../config/apiConfig";
import axios from "axios";

const initialState={
    order:null,
    error:null,
    loading:false
}

 export const createOrder = createAsyncThunk('createOrder',async(data,thunkAPI)=>{
    const token = localStorage.getItem('jwt');
    try {
        const response = await axios.post(`${API_BASE_URL}/api/orders/`, data,{
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
[createOrder.pending]:(state ,action)=>{
    state.order = action.payload
    state.loading= false
},
[createOrder.pending]:(state ,action)=>{
    state.error = action.payload
    state.loading= false
},

}
})
export default orderReducer.reducer