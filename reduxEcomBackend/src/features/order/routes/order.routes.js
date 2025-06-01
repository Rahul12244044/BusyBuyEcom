import express from "express";
import OrderController from "../controllers/order.controller.js";
const orderController=new OrderController();
const orderRouter=express.Router();
orderRouter.post("/",orderController.orderPlaced);
orderRouter.get("/getUserOrder",orderController.oneUserOrder);
export default orderRouter;