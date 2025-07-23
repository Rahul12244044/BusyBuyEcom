import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import {BASE_URL} from "../utils/api.js";
const initialState={
    orders:[]
}
export const orderPlaceAsync = createAsyncThunk(
  "post/orderPlaced",
  async (payload) => {
    const { userId, totalPrice, orderItems } = payload;
    console.log("orderPlacesAsync.........");

    const response = await fetch(`${BASE_URL}/api/order`, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({ userId, totalPrice, orderItems })
    });

    const responseJson = await response.json();
    console.log("orderPlacedAsync", responseJson);
    return responseJson;
  }
);

export const oneUserOrderAsync=createAsyncThunk("get/oneUserOrder",async (payload,thunkApi)=>{
    const query=new URLSearchParams({
        userId:payload
    })
    const response=await fetch(`${BASE_URL}/api/order/getUserOrder?${query}`,{
        method:"GET"
    });
    const oneUserOrder=await response.json();
    console.log("oneUserOrderAsync");
    console.log(oneUserOrder);
    // return oneUserOrder;
    thunkApi.dispatch(orderAction.getInitailState(oneUserOrder));
})
const orderSlice = createSlice({
  name: "orderSlice",
  initialState,
  reducers: {
    getInitailState: (state, action) => {
      state.orders = [...action.payload];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(orderPlaceAsync.fulfilled, (state, action) => {
      state.orders.push(action.payload);
    });
  }
});
export const orderReducer=orderSlice.reducer;
export const orderAction=orderSlice.actions;
export const orderSelector=(state)=>state.orderReducer;
