import {createSlice} from "@reduxjs/toolkit";
import {productActions} from "./itemsReducer.js";
const initialState={
    message:""
}
const notificationSlice=createSlice({
    name:"notificationSlice",
    initialState,
    reducers:{
        reset:(state,action)=>{
            state.message="";
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(productActions.addProduct,(state)=>{
            state.message="Product is added successfully.";
        })
    }
})
export const notificationReducer=notificationSlice.reducer;
export const notificationAction=notificationSlice.actions;
export const notificationSelector=(state)=>state.notificationReducer;