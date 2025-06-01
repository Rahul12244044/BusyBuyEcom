import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import {useSelector} from "react-redux";
const initialState={
    allProducts:[
        
    ]
}
export const getInitialStateAsync=createAsyncThunk("get/allProducts",async (_,thunkApi)=>{
    await fetch("http://localhost:3200/api/products/")
    .then((res)=>{
        console.log("response of the api");
        return res.json();
    })
    .then(parsedJson=>{
        console.log(parsedJson);
        thunkApi.dispatch(productActions.setInitialState(parsedJson));
    })
})
export const addProductAsync=createAsyncThunk("post/addProduct",async (payload,thunkApi)=>{
    const response=await fetch("http://localhost:3200/api/products/add",{
        method:"POST",
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify({
            name:payload.name,
            price:payload.price,
            image:payload.image,
            category:payload.category,
            type:payload.type
        })
    })
    console.log(payload);
    console.log("addProductAsync");
    console.log(response);
    const product=await response.json();
    console.log(product);
    

    thunkApi.dispatch(productActions.addProduct(product));
});
export const searchByPriceAndCategory=createAsyncThunk("get/searchProduct",async (payload,thunkApi)=>{
    console.log("searchByCategory");
    console.log(payload);
    const query=new URLSearchParams({
        price:payload.price,
        category:payload.categories?.join(",")
    }).toString();
    const response=await fetch(`http://localhost:3200/api/products/filter?${query}`,{
        method:"GET",
        headers:{
            "content-type":"application/json"
        }
    });
    const responseJson=await response.json();
    console.log("responseJson");
    console.log(responseJson);
    thunkApi.dispatch(productActions.searchByPriceAndCategory(responseJson));
});
export const searchProductByName=createAsyncThunk("get/searchByName",async (payload,thunkApi)=>{
    console.log("payload");
    console.log(payload);
    const query=new URLSearchParams({
        productName:payload
    })
    const response=await fetch(`http://localhost:3200/api/products/oneProduct?${query}`);
    const responseJson=await response.json();
    console.log("responseJson");
    console.log(responseJson);
    thunkApi.dispatch(productActions.searchOneProduct(responseJson));
})
const productsSlice=createSlice({
    name:"products",
    initialState,
    reducers:{
        setInitialState:(state,action)=>{
            state.allProducts=[...action.payload];
        },
        addProduct:(state,action)=>{
            state.allProducts.push(action.payload);
        },
        searchByPriceAndCategory:(state,action)=>{
            state.allProducts=action.payload;
        },
        searchOneProduct:(state,action)=>{
            state.allProducts=action.payload;
        }
        
    }
})
export const productReducer=productsSlice.reducer;
export const productActions=productsSlice.actions;
export const productSelector=(state)=>state.productReducer;