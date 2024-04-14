import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { API_BASE_URL } from "../../../config/apiConfig";
import axios from "axios";

const initialState={
    order:null,
    error:null,
    loading:false
}

export const createOrder = createAsyncThunk('createOrder', async (orderData, thunkAPI) => {
    const token = localStorage.getItem('jwt');
    const { address, navigate } = orderData;
    const cleanAddress = JSON.parse(JSON.stringify(address));
    try {
        const response = await fetch(`${API_BASE_URL}/api/orders/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify(cleanAddress)
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to create order: ${errorText}`);
        }

        const order = await response.json();
       
        navigate({ search: `step=3&order_id=${order._id}` });
        return order;
    } catch (error) {
        // Handle different types of errors appropriately
        return thunkAPI.rejectWithValue(error.message);
    }
});
 export const getOrderById = createAsyncThunk('getOrderById',async(id,thunkAPI)=>{
    const token = localStorage.getItem('jwt');
    try {
        const response = await axios.get(`${API_BASE_URL}/api/orders/${id}`,data,{
            headers: {
                authorization: token
            }
        });
        const order = await response.data;
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