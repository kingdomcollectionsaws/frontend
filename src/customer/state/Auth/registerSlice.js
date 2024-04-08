import { createSlice,createAsyncThunk } from "@reduxjs/toolkit"
import axios from 'axios'
import { API_BASE_URL } from "../../../config/apiConfig"

const initialState = {
    user:null,
    loading:false,
    error:null,
    jwt:null
}
//signup
export const createUser = createAsyncThunk( 'createUser', async(data,{rejectWithValue})=>{
    const response = await axios.post(`${API_BASE_URL}/auth/signup`,data)
    try {
        const result = await response.data;
      
        if(result){
            localStorage.setItem("jwt",result.jwt)
        }
    return result
        
        
    } catch (error) {
        return rejectWithValue(error)
    }
}
)
//signin
export const loginUser = createAsyncThunk( 'loginUser', async(data,{ rejectWithValue })=>{
    
      
       
   try {
    const response = await axios.post(`${API_BASE_URL}/auth/signin`,data)
      const  result = await response.data;
        
     if(result.jwt){
            localStorage.setItem("jwt",result.jwt)
            
        }
        return result
        
   } catch (error) {
console.log(error);
return rejectWithValue(error)
   }
    
    
      
    
}
)
//getuser

    export const getUserDetail = createAsyncThunk('getUserDetail',async(thunkAPI)=>{
        const token = localStorage.getItem('jwt');
        const response = await axios.get(`${API_BASE_URL}/api/users/profile`,{
          headers:{
            token
          }
        }
        );
        try {
             const user = await  response.data;
             return user
        } catch (error) {
            
            return error.message;    
            
        }
    })
    //update user

    export const updateUser = createAsyncThunk( 'updateUser', async(data,{rejectWithValue})=>{
        const token = localStorage.getItem('jwt');
        const response = await axios.put(`${API_BASE_URL}/api/users/profile/update`,data,{
            headers: {
                authorization: token
            }
        })
        try {
            const result = await response.data;
          
        return result
            
            
        } catch (error) {
            return rejectWithValue(error)
        }
    }
    )
export const auth = createSlice({
    name :"auth",
    initialState,
    reducers:{
        logout:(state,action)=>{
            state.user = {}
            state.jwt = null
        }
    },
    extraReducers:{
        [createUser.pending] : (state)=>{
            state.loading = true;
            state.user=null;
            state.error=null;
           
        },
        [createUser.fulfilled] : (state,action)=>{
            state.loading = false;
            state.user = action.payload;
            state.jwt = localStorage.getItem('jwt');
          
            state.error=null;
        },
        [createUser.rejected] : (state,action)=>{
            state.loading = false
            state.error = "something is wrong";
            state.user=null;
        },
        [loginUser.pending] : (state)=>{
            state.loading = true;
            state.user=null;
        },
        [loginUser.fulfilled] : (state,action)=>{
            state.error =null;
            state.loading = false;
            state.user = action.payload;
            state.jwt = localStorage.getItem('jwt');
        },
        [loginUser.rejected] : (state,action)=>{
            
            state.loading = false;
            state.error = "invalid email or paasword";
        },
        [getUserDetail.pending]:(state)=>{
            state.loading = true;

        },
        [getUserDetail.fulfilled]:(state,action)=>{
            state.loading = false;
            state.user = action.payload;
            state.error = true;
           

        },
        [getUserDetail.rejected]:(state,action)=>{
            state.loading = false
             state.error ="no user found";
             state.user=null;

    }}
});
export const {logout} = auth.actions

export default  auth.reducer;
