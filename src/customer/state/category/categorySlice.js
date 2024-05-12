import { createAsyncThunk, createSlice,} from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL } from "../../../config/apiConfig";
const initialState = {
    categories:null,
    loading:false,
    error:null,
}

 export const getCategories = createAsyncThunk('getCategories',async(thunkAPI)=>{
    try {  const response = await axios.get(`${API_BASE_URL}/api/categories/`)
        const data =  response.data;
        
        return data
        
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data)
    }
 })



export const categoriesReducer = createSlice({
    name:'categories',
    initialState,
    extraReducers:{
        [getCategories.pending]:(state,action)=>{
          
            state.loading = true
        },  
        [getCategories.fulfilled]:(state,action)=>{
          
            state.categories = action.payload
            state.loading = false
        },
        [getCategories.rejected]:(state,action)=>{
            state.loading= false
            state.error = action.payload
        },
    }
})
export default categoriesReducer.reducer