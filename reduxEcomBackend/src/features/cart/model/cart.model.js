import {collection,addDoc,getDoc,query,where,getDocs,doc,updateDoc,deleteDoc} from "firebase/firestore";
import db from "../../../firebase.js";
export default class CartModel{
    constructor(userId,productId,quantity,elm,found=false){
        // this.id=id;
        this.userId=userId;
        this.productId=productId;
        this.quantity=quantity;
        this.elm=elm;
        this.found=false;
    }
    static async addToCart(body){
        try{
        const {userId,productId,quantity,elm}=body;
        console.log(typeof productId);
        const pId=parseFloat(productId);
        const qTotal=parseFloat(quantity);
        const collectionRef=collection(db,"carts");
        console.log("userId");
        console.log(userId);
        console.log("productId");
        console.log(pId);
        const cartObj=JSON.parse(elm);
        // const cartIndex=allCarts.findIndex((elm)=>elm.userId===parseFloat(userId) && elm.productId===parseFloat(productId));
        const q=query(collectionRef,
            where("userId","==",userId),where("productId","==",pId));
        const docFound=await getDocs(q);
        console.log("docFound");
        console.log(docFound.empty);
        // console.log(docFound.docs[0].data());
        // console.log(docFound.docs[0].id);

        // console.log("addToCart");
        // console.log(cartIndex);
        // const cartObj=JSON.parse(elm);
        
        if(!docFound.empty){
            // allCarts[cartIndex].quantity=allCarts[cartIndex].quantity+1;
            // allCarts[cartIndex].found=true;
            // docFound.docs[0].data.quantity=docFound.docs[0].quantity+1;
            // docFound.docs[0].data.found=true
            const docRef=doc(db,"carts",docFound.docs[0].id);
            await updateDoc(docRef,{quantity:docFound.docs[0].data().quantity+1,found:true});
            // return allCarts[cartIndex];
            return {userId,productId:pId,quantity:docFound.docs[0].data().quantity+1,elm:cartObj,found:true}
        }else{
       
        // const cart=new CartModel(userId,parseFloat(productId),1,cartObj,false);
        // console.log(cart);
        const cartDocument=await addDoc(collectionRef,{userId,productId:pId,quantity:1,elm:cartObj,found:false});
        // console.log("cart");
        // console.log(cart);
        // allCarts.push(cartDocument);
        // console.log("allCarts");
        // console.log(allCarts);
        return {userId,productId:pId,quantity:1,elm:cartObj,found:false};
        }
    }catch(err){
        console.log(err);
        throw new Error("something went wrong");
    }
    }
    static async deleteCartItems(productId,userId){
        // console.log("allCartItems((((((((((((((((((((");
        try{
        console.log(productId);
        console.log(userId);
        console.log("beforeeeeeeeeeeeeeeeeeee");
        // console.log(allCarts);
        // const userIndex=allCarts.findIndex((elm)=>elm.productId===productId && elm.userId===userId);
        const collectionRef=collection(db,"carts");
        const q=query(collectionRef,where("userId","==",userId),where("productId","==",productId));
        const docFound=await getDocs(q);
        // const deleteDoc=docFound.docs[0].data();
        const docId=docFound.docs[0].id;
        if(!docFound.empty){
            await deleteDoc(doc(db,"carts",docId))
        }
        // getDocs(collectionRef)
        // console.log("userIndex");
        // console.log(userIndex);
        // allCarts.splice(userIndex,1);
        console.log("afterrrrrrrrrrrrrrrrrrrrrrr");
        // console.log(allCarts);
        // const userCartItems=allCarts.filter((elm)=>elm.userId===userId);
        const q2=query(collectionRef,where("userId","==",userId));
        const docsAfterRemove=await getDocs(q2)
        let userCartItems=[];
        docsAfterRemove.docs.forEach((elm)=>{
            userCartItems.push(elm.data());
        });
        console.log(userCartItems);

        // console.log(allCartItems);
        return userCartItems;
    }catch(err){
        console.log(err);
        throw new Error("something went wrong");
    }
    }
    static async getAllCarts (userId){
        try{
        // const allCartsItemsUser=allCarts.filter((elm)=>elm.userId===userId && elm.quantity>0);
        const collectionRef=collection(db,"carts");
        const q=query(collectionRef,where("userId","==",userId));
        const querySnapShots=await getDocs(q);
        console.log(querySnapShots);
        console.log("allCartsItemsUsers");
        let allCartsItemsUsers=[];
        querySnapShots.forEach((doc) => {
            allCartsItemsUsers.push(doc.data());
        });
        console.log(allCartsItemsUsers);
        return allCartsItemsUsers;
        }catch(err){
            console.log(err);
            throw new Error("something went wrong");
        }
    }
    static async decrementQuantity(userId,productId){
        try{
        console.log(allCarts);
        // const cartItem=allCarts.find((elm)=>elm.userId===userId && elm.productId===productId);
        const collectionRef=collection(db,"carts");
        const q=query(collectionRef,where("userId","==",userId),where("productId","==",productId));
        // console.log(cartItem);
        const docFound=await getDocs(q);
        const allInfo={...docFound.docs[0].data()};
        if(!docFound.empty){
            console.log("elementFound");
            console.log(docFound.docs[0].data());
            console.log(docFound.docs[0].data().quantity);
            const docRef=doc(db,"carts",docFound.docs[0].id);
            if(docFound.docs[0].data().quantity>1){
            await updateDoc(docRef,{quantity:docFound.docs[0].data().quantity-1});
            return {cartItem:{...allInfo,quantity:allInfo.quantity-1},isZero:false};
            }
            if(docFound.docs[0].data().quantity===1){
                // const userIndex=allCarts.findIndex((elm)=>elm.productId===productId && elm.userId===userId);
                // // allCarts.splice(userIndex,1);
                // await deleteDoc(docRef);
                // const userCartItems=allCarts.filter((elm)=>elm.userId===userId);
                console.log("onlyOne");
                const docRef=doc(db,"carts",docFound.docs[0].id);
                await deleteDoc(docRef);
                const q=query(collectionRef,where("userId","==",userId));
                const allUserDocs=await getDocs(collectionRef,q);//1)querySnapShot
                console.log("allUserDocs");
                console.log(allUserDocs.docs);
                let userCartItems=[];
                allUserDocs.docs.forEach((doc)=>{
                    userCartItems.push(doc.data());
                })
            
                
                return {userCartItems,isZero:true};
            }
        }
        // if(cartItem.quantity>1){
        // cartItem.quantity=cartItem.quantity-1;
        // return {cartItem,isZero:false};
        // }
        }catch(err){
            console.log(err);
            throw new Error("somwthing went wrong");
        }
        
        // if(cartItem.quantity===1){
        //     const userIndex=allCarts.findIndex((elm)=>elm.productId===productId && elm.userId===userId);
        //     allCarts.splice(userIndex,1);
        //     const userCartItems=allCarts.filter((elm)=>elm.userId===userId);
        //     return userCartItems;
        // }
    }
    static async quantityUpOfCart(productId,userId){
        try{
        // const cartIndex=allCarts.findIndex((elm)=>elm.productId===productId && elm.userId===userId);
        const collectionRef=collection(db,"carts");
        const q=query(collectionRef,where("userId","==",userId),where("productId","==",productId));
        const docFound=await getDocs(q);
        const docId=docFound.docs[0].id;
        console.log(docId);
        await updateDoc(doc(db,"carts",docId),{quantity:docFound.docs[0].data().quantity+1});
        // allCarts[cartIndex].quantity=allCarts[cartIndex].quantity+1;
        return {...docFound.docs[0].data(),quantity:docFound.docs[0].data().quantity+1};
        }catch(err){
            console.log(err);
            throw new Error("something went wrong");
        }
        // return allCarts[cartIndex];
    }
    static async deleteAllCartItemsUser(userId){
        // allCarts=allCarts.filter((elm)=>elm.userId!==userId);
        // for(let r=0;r<allCarts.length;r++){
        //     if(allCarts[r].userId===userId){
        //         allCarts.splice(r,1);
        //     }
        // }
        // console.log(allCarts);
        try{
            console.log("deleteAllCartItemsAfterPurchase");
            const collectionRef=collection(db,"carts");
            const q=query(collectionRef,where("userId","==",userId));
            const allUserCarts=await getDocs(q);
            // console.log(allUserCarts.docs);
            console.log("...................");
            for(const docSingle of allUserCarts.docs){
                console.log(docSingle.id);
                const docRef=doc(db,"carts",docSingle.id);
                await deleteDoc(docRef);
            };
            console.log("allItems");

        }catch(err){
            console.log(err);
            throw new Error("somethign went wrong");
        }
    }
}
var allCarts=[
   
]