import {configureStore} from "@reduxjs/toolkit"
import personalReducer from "../features/personalSlice"
const store=configureStore({
    reducer:{
        personalInfo:personalReducer
    }
})

export default store;
