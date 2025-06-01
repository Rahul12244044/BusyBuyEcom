import db from "../../../firebase.js";
import {collection,addDoc,getDocs,doc,getDoc,updateDoc} from "firebase/firestore";
export default class UserModel{
    constructor(id,name,email,password,typeUser,loggedIn=true){
        this.id=id;
        this.name=name;
        this.email=email;
        this.password=password;
        this.typeUser=typeUser;
        this.loggedIn=loggedIn
    }
    static async signUpUser(body){
        try{
        const {name,email,password,typeUser}=body;
        const collectionRef=collection(db,"users");
        const docsSnapShot=await getDocs(collectionRef);
        for(const userDocs of docsSnapShot.docs){
            if(userDocs.data().email===email){
                console.log("sameUserFound");
                return undefined;
            }
        }
        const userDocument=await addDoc(collectionRef,{name,email,password,typeUser,loggedIn:true});
        console.log("signUpUser");
        console.log(userDocument.id);
        // const user=new UserModel(docRef.id,name,email,password,typeUser,true);
        // allUsers.push(user);
        const docRef=doc(db,"users",userDocument.id);
        await updateDoc(docRef,{id:userDocument.id})
        const docSnap=await getDoc(docRef);
        console.log(docSnap.data());
        return docSnap.data();
        }catch(err){
            console.log(err);
            throw new Error("signUp failed");
        }
    }
    static async signInUser(body){
        try{
        const {email,password}=body;
        const collectionRef=collection(db,"users");
        const userSnapShots=await getDocs(collectionRef);
        console.log("allUsers");
        let isUserFound=null;
        // console.log(userSnapShots);
         for(const userDocs of userSnapShots.docs){
            // console.log(doc.data());
            const user={...userDocs.data(),id:userDocs.id}
            if(user.email===email && user.password===password){
                const docRef=doc(db,"users",user.id);
                await updateDoc(docRef,{loggedIn:true});
                isUserFound={...user,loggedIn:true};
                console.log("isUserFound");
                console.log(isUserFound);
            }
        }
        return isUserFound;
            // console.log(user);
            // allUsers.push(user);
    

        // const userIndex=allUsers.findIndex((elm)=>elm.email===email && elm.password===password);
        // allUsers[userIndex].loggedIn=true;
        // return allUsers[userIndex];
        }catch(err){
            console.log(err);
            throw new Error("something went wrong");
        }
    }
    static async logOutUser(userId){
        // const userIndex=allUsers.findIndex((elm)=>elm.id===userId);
        // console.log(allUsers[userIndex]);
        // allUsers[userIndex].loggedIn=false;
        // return allUsers[userIndex];
        try{
            // const collectionRef=collection(db,"users");
            const docRef=doc(db,"users",userId);
            
            console.log("isUserSignUpFound");
            // console.log(docSnap.data());
            // docSnap.data().isLogged=false;
            await updateDoc(docRef,{loggedIn:false})
            const docSnap=await getDoc(docRef);
            return docSnap.data();

        }catch(err){
            console.log(err);
            throw new Error("something went wrong");
        }
    }
}
var allUsers=[
    // new UserModel(1,"Radha","radhakrishan76@gmail.com","Radha@4044","seller",true)
]