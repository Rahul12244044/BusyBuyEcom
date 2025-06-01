// import logo from './logo.svg';
// import './App.css';
import ItemCard from "./pages/itemCard.js";
import NavBar from "./components/nav.js";
import PriceRange from "./pages/priceRange.js";
import AddProduct from "./pages/addProduct.js";
import Cart from "./pages/cart.js";
import TotalPrice from "./pages/totalPrice.js";
import SignUp from "./pages/signUp.js";
import SignIn from "./pages/signIn.js";
import MyOrders from "./pages/myOrders.js";
import {createBrowserRouter,RouterProvider} from "react-router-dom";
import {Provider} from "react-redux";
import store from "../src/store.js";
import {useState} from "react";
import ItemContextProvider from "./context/itemContext.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  // createBrowserRouter([
  //   {path:"/",element:}
  // ])
  const [loggedIn,setLoggedIn]=useState(false);
  const router = createBrowserRouter([
    {path:"/",element:<NavBar/>,children:[
      {path:"/",element:<ItemCard/>},
      {path:"addProduct",element:<AddProduct/>},
      {path:"/cart",element:<Cart/>,children:[
        {path:"/cart",element:<TotalPrice/>}
      ]},
      {path:"/signUp",element:<SignUp/>},
      {path:"/signIn",element:<SignIn/>},
      {path:"/myOrders",element:<MyOrders/>}
    ]},
    
  ]);
  return (
    <>
    <ToastContainer/>
    <Provider store={store}>
      <ItemContextProvider>
    <RouterProvider router={router}></RouterProvider>
    </ItemContextProvider>
    </Provider>
    </>
  );
}

export default App;
