import { createSlice } from "@reduxjs/toolkit";

const initialState={
   personalInfo:{
        fullName: "",
        headline: "",
        email   : "",
        gender  : "",
        linkedIn: "",
        github  : "",
        nationality: "",
        location : "",
        phone   : "",
        dob     : ""
   },
   education:[],
    experience:[],
    skills:[],
    projects:[],
    certifications:[],
    languages:[],
    achievements:[],
    interests:[],
    

    
}

export const formSlice=createSlice({

    name:"formSlice",
    initialState,

    reducers:{
        addPersonalInfo:(state,action)=>{
            state.personalInfo={...state.personalInfo,...action.payload};

        },
        addEduInfo:(state,action)=>{
          state.education=[action.payload,...state.education];
        },
        addSkillInfo:(state,action)=>{
            state.skills=[action.payload,...state.skills];
        },
        addExperienceInfo:(state,action)=>{
            state.experience=[action.payload,...state.experience];
        },
        addProjectInfo:(state,action)=>{
            state.projects=[action.payload,...state.projects];
        },
        addCertificationInfo:(state,action)=>{
            state.certifications=[action.payload,...state.certifications];
        },
        addLanguageInfo:(state,action)=>{
            state.languages=[action.payload,...state.languages];
        },
        addAchievementInfo:(state,action)=>{
            state.achievements=[action.payload,...state.achievements];
        },
        addInterestInfo:(state,action)=>{
            state.interests=[action.payload,...state.interests];
        },
        



    }
    }
)

export const {addPersonalInfo,addAchievementInfo,addCertificationInfo,addEduInfo,addExperienceInfo,addInterestInfo,addLanguageInfo

 } = formSlice.actions;
export default formSlice.reducer;