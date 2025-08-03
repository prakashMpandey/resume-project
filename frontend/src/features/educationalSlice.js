import { createSlice } from "@reduxjs/toolkit";

const initialState={
    education:[]
}

const educationalSlice=createSlice({
    name:"educationalInfo",
    initialState,
    reducers:{
        addEducation:(state, action) => {
          
            const { degree, institution, startDate, endDate, description } = action.payload;
            state.education.push({
                degree,
                institution,
                startDate,
                endDate,
                description
            });
        },
        removeEducation:(state, action) => {
            const index = action.payload;
            if (index > -1 && index < state.education.length) {
                state.education.splice(index, 1);
            }
        },
        updateEducation:(state,action)=>{
            const {index,field,value}=action.payload;
            if (state.education[index]) {
                state.education[index][field] = value;
        }
       }
    }
})

export const { addEducation, updateEducation, removeEducation } = educationalSlice.actions;
export default educationalSlice.reducer;
