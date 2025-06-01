import {configureStore,getDefaultMiddleware} from "@reduxjs/toolkit";
import {productReducer} from "./redux/reducers/itemsReducer.js";
import {notificationReducer} from "./redux/reducers/notificationReducer.js";
import {userReducer} from "./redux/reducers/userReducer.js";
import {cartReducer} from "./redux/reducers/cartReducer.js";
import {orderReducer} from "./redux/reducers/orderReducer.js"
import {thunk} from "redux-thunk";
import {loggerMiddleware} from "./middlewares/loggerMiddleware.js";
const store=configureStore({
    reducer:{
        productReducer,
        notificationReducer,
        userReducer,
        cartReducer,
        orderReducer
    },
    middleware:[...getDefaultMiddleware()]
})
export default store;