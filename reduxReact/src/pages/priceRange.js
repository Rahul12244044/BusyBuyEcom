import React from "react";
import priceCssModule from "../cssModule/priceRange.module.css";
import {useState,useEffect} from "react";
// import {useItem} from "../context/itemContext.js";
import {searchByPriceAndCategory} from "../redux/reducers/itemsReducer.js";
import {useDispatch} from "react-redux";
const PriceRange=()=>{
    // const {searchByCategory,isCategorySelected,priceRange}=useItem();
    const [price,setPrice]=useState(50000);
    const [selectCategories,setSelectedCategories]=useState([]);
    const [searchObj,setSearchObj]=useState({price:undefined,categories:undefined});
    const dispatch=useDispatch();
    const handleCheck=(event)=>{
        console.log("handleCheck");
        console.log("setCategories");
        const {checked,value}=event.target;
        console.log(checked);
        console.log(value);
        if(checked){
            setSelectedCategories((prevState)=>{
                return [...prevState,value];
            })
        }else{
            setSelectedCategories((prevState)=>{
                return prevState.filter((elm)=>elm!==value);
            })
        }
        console.log(selectCategories);
        // setSearchObj((prevState)=>({...prevState,categories:selectCategories}))
        // dispatch(searchByPriceAndCategory(searchObj));
    }
    console.log("priceRange");
    console.log(price);
    // {price?setSearchObj((prevState)=>({...prevState,price:price})):null}
    // if(price){
    //     setSearchObj((prevState)=>({...prevState,price:price}));
    // }

    useEffect(() => {
        setSearchObj((prevState) => ({ ...prevState, price }));
    }, [price]);

    // ✅ Update `searchObj` whenever `selectedCategories` changes
    useEffect(() => {
        setSearchObj((prevState) => ({ ...prevState, categories: selectCategories }));
    }, [selectCategories]);

    // ✅ Dispatch whenever `searchObj` changes (prevents unnecessary renders)
    useEffect(() => {
        dispatch(searchByPriceAndCategory(searchObj));
    }, [searchObj, dispatch]);
    return (
    <>
    <div className={priceCssModule.priceFilter}>
        <h2 className={priceCssModule.filterAndCategory}>Filter</h2>
        <form  className={priceCssModule.priceForm}>
            <label className={priceCssModule.price}>price:{price}</label>
            <input onChange={(event)=>setPrice(event.target.value)} className={priceCssModule.takePrice} type="range" name="range" min="500" max="200000" step="50" value={price}/>
            <h2 className={priceCssModule.filterAndCategory}>Category</h2>
            <div className={priceCssModule.filterItems}>
                <div>
                <input type="checkbox" value="Men's Clothing" onChange={handleCheck}/>
                <lablel>Men's Clothing</lablel>
                </div>
                <div>
                <input type="checkbox" value="Women's Clothing" onChange={handleCheck} />
                <lablel>Womens's Clothing</lablel>
                </div>
                <div>
                <input type="checkbox" value="Jewelery" onChange={handleCheck}/>
                <lablel>Jewelery</lablel>
                </div>
                <div>
                <input type="checkbox" value="Electronics" onChange={handleCheck}/>
                <lablel>Electronics</lablel>
                </div>
                <div>
                <input type="checkbox" value="Kitchen" onChange={handleCheck}/>
                <lablel>Kitchen</lablel>
                </div>
                <div>
                <input type="checkbox" value="Man's Shoes" onChange={handleCheck}/>
                <lablel>Man's Shoes</lablel>
                </div>
                <div>
                <input type="checkbox" value="Women's Shoes" onChange={handleCheck}/>
                <lablel>Womens's Shoes</lablel>
                </div>
                <div>
                <input type="checkbox" value="Bags" onChange={handleCheck}/>
                <lablel>Bags</lablel>
                </div>
                <div>
                <input type="checkbox" value="House Decoration" onChange={handleCheck}/>
                <lablel>House Decoration</lablel>
                </div>
            </div>
        </form>

    </div>
    </>)
}
export default PriceRange;