import express from "express";
import uploads from "./src/middleware/fileUpload.middleware.js";
import bodyParser from "body-parser";
//5)import cors(that is for the security reason)
import cors from "cors";
//4)import productRouter
import productRouter from "./src/features/product/routes/product.routes.js";
//9)import userRouter
import userRouter from "./src/features/user/userRoutes/user.routes.js";
//10)import cartRouter
import cartRouter from "./src/features/cart/routes/cart.routes.js";
//13)import orderRouter
import orderRouter from "./src/features/order/routes/order.routes.js";
//1)creating server from express
const server=express();
//7)This middleware for parsing
server.use(express.json())
server.use(express.urlencoded({extended:true}))
//6)enable cors for all the request
server.use(cors());
//3)If the url is matching this pattern then we are going on this route(productRouter)
server.use("/api/products",productRouter);
//8)If the url is matching this pattern then we are going on this route(userRouter)
server.use("/api/user",userRouter)
//11)If all the url is matching thin pattern then we are going on this route(cartRouter)
server.use("/api/cart",cartRouter);
//12)If all the url is mathing this pattern then we are going on this route(orderRouter)
server.use("/api/order",orderRouter)
//2)listening the server at specified PORT number
server.listen(3200,()=>{
    console.log("server is listening at 3200");
});