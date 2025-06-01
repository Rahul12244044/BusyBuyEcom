import OrderModel from "../model/order.model.js";
import {sendOrderConfirmationEmail} from "../mails.js";
export default class OrderController{
    async orderPlaced(req,res){
        try{
        // console.log("userId");
        // console.log(userId);
        console.log("orderPlacedingingingingingingignigngingign");
        console.log(req.body);
        const {userId,totalPrice,orderItems,userEmails,userPhoneNumber,userAddress,nameUser}=req.body;
        console.log(orderItems);
        const userOrderPlaced=await OrderModel.userPlaceOrder(userId,totalPrice,orderItems);
        console.log(userOrderPlaced);
        console.log("isOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO");
        await sendOrderConfirmationEmail(userEmails, {
            totalPrice,
            items: orderItems,
            userPhoneNumber,
            userAddress,
            nameUser
          });
        res.status(201).send(userOrderPlaced);
        }catch(err){
            console.log(err);
            throw new Error("something went wrong");
        }
    }
    async oneUserOrder(req,res){
        try{
        console.log("oneUserOrders");
        console.log(req.query);
        const {userId}=req.query;
        const oneUsersOrders=await OrderModel.allOneUserOrders(userId);
        res.status(200).send(oneUsersOrders);
        }catch(err){
            console.log(err);
            throw new Error("something went wrong");
        }
    }
}