import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
const initialState={
    orders:[]
}
export const orderPlaceAsync=createAsyncThunk("post/orderPlaced",async (payload,thunkApi)=>{
    const {userId,totalPrice,orderItems}=payload;
    console.log("orderPlacesAsync.........");
    console.log(userId);
    const response=await fetch("http://localhost:3200/api/order",{
        method:"POST",
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify({
            userId,
            totalPrice,
            orderItems
        })
    })
    console.log(response);
    console.log("orderPlacedAsync");
    const responseJson=await response.json();
    console.log(responseJson);
    thunkApi.dispatch(orderAction.orderPlaced(responseJson))
});
export const oneUserOrderAsync=createAsyncThunk("get/oneUserOrder",async (payload,thunkApi)=>{
    const query=new URLSearchParams({
        userId:payload
    })
    const response=await fetch(`http://localhost:3200/api/order/getUserOrder?${query}`,{
        method:"GET"
    });
    const oneUserOrder=await response.json();
    console.log("oneUserOrderAsync");
    console.log(oneUserOrder);
    // return oneUserOrder;
    thunkApi.dispatch(orderAction.getInitailState(oneUserOrder));
})
const orderSlice=createSlice({
    name:"orderSlice",
    initialState,
    reducers:{
        getInitailState:(state,action)=>{
            console.log("ordersInitialState");
            console.log(action.payload);
            state.orders=[...action.payload];
        },
        orderPlaced:(state,action)=>{
        state.orders.push(action.payload);
        }
      
    }
});
export const orderReducer=orderSlice.reducer;
export const orderAction=orderSlice.actions;
export const orderSelector=(state)=>state.orderReducer;
