import {collection,addDoc,query,where,getDocs} from "firebase/firestore";
import db from "../../../firebase.js";
export default class OrderModel{
    constructor(userId,time,totalAmount,orderPlaced){
        this.userId=userId;
        this.time=time;
        this.totalAmount=totalAmount;
        this.orderPlaced=orderPlaced;
    }
    static async userPlaceOrder(userId,totalPrice,orderItems){
        // const orderPlaced=new OrderModel(parseFloat(userId),new Date(),totalPrice,orderItems)
        // allOrders.push(orderPlaced);
        // return orderPlaced;
        try{
            console.log("orderPlaced")
            const collectionRef=collection(db,"orders");
            await addDoc(collectionRef,{userId,totalPrice,orderItems,orderOn:new Date()});
            return {userId,totalPrice,orderItems};

        }catch(err){
            console.log(err);
            throw new Error("something went wrong");
        }
    }
    static async allOneUserOrders(userId){
        // const oneUserOrders=allOrders.filter((elm)=>elm.userId===userId);
        // return oneUserOrders;
        try{
            const collectionRef=collection(db,"orders");
            const q=query(collectionRef,where("userId","==",userId));
            const allOrdersUser=await getDocs(q);
            let oneUsersOrders=[];
            for(const singleDoc of allOrdersUser.docs){
                oneUsersOrders.push(singleDoc.data());
            }
            console.log("oneUserOrders");
            console.log(oneUsersOrders);
            return oneUsersOrders;
        }catch(err){
            console.log(err);
            throw new Error("something went wrong");
        }
    }
}
var allOrders=[]