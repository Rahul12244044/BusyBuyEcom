import ProductModel from "../models/product.model.js";
export default class ProductController{
    getAllProducts(req,res){
        const allProducts=ProductModel.getAll();
        res.status(200).send(allProducts);
    }
    getOneProduct(req,res){
        const {productName}=req.query;
        console.log("searchProductByName");
        console.log(productName);
        const searchProducts=ProductModel.getSearchProductByName(productName);
        res.status(200).send(searchProducts);


    }
    addProduct(req,res){
        console.log("reqBody");
        console.log(req.body);
        console.log("reqFilesController");
        console.log(req.files);
        const {name,price,quantity,category,type,image}=req.body;
        // const types=type.split(",");
        console.log("types");
        // console.log(types);
        const productObj={
            name,
            price,
            image,
            quantity,
            category,
            type

        }
        const result=ProductModel.addOneProduct(productObj);
        console.log("addProduct");
        res.status(201).send(result);

    }
    filterProduct(req,res){
        console.log("filterProduct");
        console.log(req.query);
        const {price,category}=req.query;
        const filterProducts=ProductModel.getFilterProduct(price,category);
        res.status(200).send(filterProducts);
        }
    }

