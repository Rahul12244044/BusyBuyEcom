import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
const initialState={
    users:[]
}
export const signUpAsync=createAsyncThunk("post/signUp",async ({payload,setNameUser,setTypeCustomer,setLoggedIn,setUserId,setUserExist},thunkApi)=>{
    console.log("signUpAsync");
    const response=await fetch("http://localhost:3200/api/user/signUp",{
        method:"POST",
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify({
            name:payload.name,
            email:payload.email,
            password:payload.password,
            typeUser:payload.userType,
            loggedIn:true
        })
    });
    if(response.status===400){
        console.log("Error 404")
        const error ={signUp:false} // Parse error response
        return error;
    }else{
    const responseJson=await response.json();
    console.log("signUpResponseJson");
    console.log(responseJson);
    thunkApi.dispatch(userActions.addUser(responseJson));
    setNameUser(responseJson.name);
    setTypeCustomer(responseJson.typeUser);
    setLoggedIn(responseJson.loggedIn);
    setUserId(responseJson.id);
    return {signUp:true};
    }
});
export const signInAsync=createAsyncThunk("post/signIn",async ({payload,setNameUser,setTypeCustomer,setLoggedIn,setUserId},thunkApi)=>{
    console.log(payload);
    const response=await fetch("http://localhost:3200/api/user/signIn",{
        method:"POST",
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify({
            email:payload.email,
            password:payload.password
        })
    });
    console.log(response);
    if(response.status===404){
        console.log("Error 404");
    }else{
    const isUserFound=await response.json();
    console.log("userFound");
    console.log(isUserFound);
    setNameUser(isUserFound.name);
    setTypeCustomer(isUserFound.typeUser);
    setLoggedIn(isUserFound.loggedIn);
    setUserId(isUserFound.id);
    return isUserFound;
    }
});
export const logoutAsyncUser=createAsyncThunk("get/logout",async ({payload,setLoggedIn,setNameUser},thunkApi)=>{
    console.log("logoutAsyncUser");
    console.log(payload);
    const query=new URLSearchParams({
        userId:payload
    })
    const response=await fetch(`http://localhost:3200/api/user/logout?${query}`);
    const responseJson=await response.json();
    console.log("logoutAsyncUsers");
    console.log(responseJson);
    setLoggedIn(responseJson.loggedIn);
    setNameUser(undefined);
})

const userSlice=createSlice({
    name:"userSlice",
    initialState,
    reducers:{
        addUser:(state,action)=>{
            state.users.push(action.payload);
        },
        logOut:(state,action)=>{

        },
        signIn:(state,action)=>{

        }
    }
})
export const userReducer=userSlice.reducer;
export const userActions=userSlice.actions;
export const userSelector=(state)=>state.userReducer