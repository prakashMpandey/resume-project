import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {GET_USER_API, SIGN_IN_API, SIGN_UP_API, LOG_OUT_API, api } from "../utils/ApiList";

const initialState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  isCheckingAuth: false,
  error: null,
};

export const signin = createAsyncThunk(
  "auth/signin",
  async (userData, { rejectWithValue }) => {
    console.log(userData);
    try {
      console.log(userData);
      const { data } = await api.post(SIGN_IN_API, userData);

      console.log("data is store", data);
      if (data?.success) {
        return data;
      } else {
        return rejectWithValue(data.message || "sign in failed");
      }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const signup = createAsyncThunk(
  "auth/signup",
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await api.post(SIGN_UP_API, userData);
      console.log("data in signup");

      if (data?.success) {
        return data;
      } else {
        return rejectWithValue(data.message || "sign in failed");
      }
    } catch (error) {
      return rejectWithValue(error?.message);
    }
  }
);
export const logout=createAsyncThunk(
    "auth/logout",async()=>{
        try{
            const response=await api.post(LOG_OUT_API);
            return response.data;
        }
        catch(error){
            return rejectwithValue(error?.message || "log out failed")
        }
    }
)

export const checkAuth=createAsyncThunk(
  "auth/checkAuth",async(_,{rejectWithValue})=>{
    try {
      const {data}=await api.get(GET_USER_API);
      console.log("getting user data ",data)
      return data;
    } catch (error) {
      console.log("error :",error)
      return rejectWithValue(error?.message ||"please login ...")
      
    }

  }
)


const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    changeLoadingState:(state,action)=>{
        state.loading=action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(signin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signin.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.data;
      })
      .addCase(signin.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.payload;
      })

      .addCase(signup.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.data;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
      })

      .addCase(logout.pending,(state,action)=>{
        state.loading=true;
      })
      .addCase(logout.fulfilled,(state,action)=>{
        state.loading=true;
        state.user=null
        state.isAuthenticated=false;
      })
      .addCase(logout.rejected,(state,action)=>{
        state.loading=false;
        state.error=action.payload;
      })
      .addCase(checkAuth.pending,(state,action)=>{
        state.loading=true;
        state.isCheckingAuth=true;
        state.isAuthenticated=false;
      })
      .addCase(checkAuth.rejected ,(state,action)=>{
        state.loading=false;
        state.isCheckingAuth=false;
        state.isAuthenticated=false;
        state.user=null;
      })
      .addCase(checkAuth.fulfilled,(state,action)=>{
        state.loading=false;
        state.isAuthenticated=true;
        state.isCheckingAuth=false;
        state.user=action.payload.data;
      });
  },
});

export const {changeLoadingState} = authSlice.actions;
export default authSlice.reducer;
