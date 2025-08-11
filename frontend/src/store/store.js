import {configureStore} from "@reduxjs/toolkit"
import formReducer from "../features/formSlice"
const store=configureStore({
    reducer:{
        formInfo:formReducer
    }
})

export default store;
