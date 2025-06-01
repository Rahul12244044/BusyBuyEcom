import CartModel from "../model/cart.model.js";
export default class CartController{
    async addCart(req,res){
        try{
        console.log(req.query);
        console.log("addCart");
        console.log(JSON.parse(req.query.elm));
        const cartItem=await CartModel.addToCart(req.query);
        console.log("inside the controller");
        console.log(cartItem);
        res.status(201).send(cartItem);
        }catch(err){
            console.log(err);
            throw new Error("something went wrong");
        }
    }
    async deleteCart(req,res){
        try{
        console.log("deleteCartItems");
        // console.log(req.query);
        const {userId,productId}=req.query;
        console.log(typeof userId);
        console.log(typeof productId);
        const allItems=await CartModel.deleteCartItems(parseFloat(productId),userId);
        console.log("after Delete");
        console.log(allItems);
        res.status(200).send(allItems);
        }catch(err){
            console.log(err);
            throw new Error("something went wrong");
        }
    }
    async quantityUpOrDown(req,res){
        try{
        console.log("quantityUp");
        console.log(req.query.userId);
        console.log(req.query.productId);
        const {userId,productId}=req.query;
        const updateProduct=await CartModel.decrementQuantity(userId,parseFloat(productId));
        console.log("quantityUpOrDown");
        console.log(updateProduct);
        res.status(200).send(updateProduct);
        }catch(err){
            console.log(err);
            throw new Error("something went wrong");
        }
    }
    async quantityUp(req,res){
        try{
        console.log("quantityUp");
        console.log(req.query);
        const {productId,userId}=req.query;
        const quantityUpCart=await CartModel.quantityUpOfCart(parseFloat(productId),userId);
        console.log(quantityUpCart);
        res.status(200).send(quantityUpCart);
        }catch(err){
            console.log(err);
            throw new Error("something went wrong");
        }

    }
    async getAllCartItemsUser(req,res){
        try{
        console.log("setInitailStateOfCart");
        console.log(req.query.userId);
        const {userId}=req.query;
        const allCartItemsUser=await CartModel.getAllCarts(userId);
        res.status(200).send(allCartItemsUser);
        }catch(err){
            console.log(err);
            throw new Error("something went wrong");
        }
    }
    async deleteAllCartItem(req,res){
        try{
        const {userId}=req.query;
        console.log("deleteAllCartItems");
        console.log(userId);
        await CartModel.deleteAllCartItemsUser(userId);
        res.status(200).send("cartItems are deleted successfully!");
        }catch(err){
            console.log(err);
            throw new Error("something went wrong");
        }
    }
}