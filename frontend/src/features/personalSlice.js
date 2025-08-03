import { createSlice } from "@reduxjs/toolkit";

const initialState={
    fullName:"",
    headline:"",
    phone:"",
    email:"",
    dob:"",
    address:"",
    linkedin:"",
    github:"",
    nationality:"",
    gender:""

    
}

export const personalSlice=createSlice({

    name:"personalInfo",
    initialState,
    reducers:{

        addInfo:(state,action)=>{
           Object.assign(state, action.payload);
        },
        updateInfo:(state,action)=>{
            const { field, value } = action.payload;
            state[field] = value;
        },
        clearInfo:(state,action)=>{
            state.fullName="",
            state.email="",
            state.gender="",
            state.linkedin="",
            state.address="",
            state.nationality="",
            state.phone="",
            state.headline="",
            state.dob="",
            state.github=""
        },

    }

})

export const { addInfo, updateInfo, clearInfo } = personalSlice.actions;
export default personalSlice.reducer;