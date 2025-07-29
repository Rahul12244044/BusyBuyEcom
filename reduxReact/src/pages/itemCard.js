import itemCssModule from "../cssModule/item.module.css";
import { useSelector, useDispatch } from "react-redux";
import { productSelector, getInitialStateAsync } from "../redux/reducers/itemsReducer.js";
import { addToCartAsync } from "../redux/reducers/cartReducer.js";
import { useItem } from "../context/itemContext.js";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { debounce } from "lodash";
import { ClipLoader } from "react-spinners";

const ItemCard = () => {
  const productState = useSelector(productSelector);
  const dispatch = useDispatch();
  const { loggedIn, userId, setTotalPrice } = useItem();
  const navigate = useNavigate();

  const [likedItems, setLikedItems] = useState({});
  const [totalQuantity, setTotalQuantity] = useState(1);
  const [isProductAdded, setIsProductAdded] = useState(false);
  const [itemAdd, setItemAdd] = useState({});
  const [loading, setLoading] = useState(true);
  const [filtering, setFiltering] = useState(true);

  // Initial product fetch
  useEffect(() => {
    dispatch(getInitialStateAsync());
  }, [dispatch]);

  // Simulated loading effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Simulated filtering transition
  useEffect(() => {
    if (!loading) {
      setFiltering(true);
      const delay = setTimeout(() => {
        setFiltering(false);
      }, 2000);
      return () => clearTimeout(delay);
    }
  }, [productState.allProducts, loading]);

  // Debounced cart add handler
  const debouncedAddToCart = debounce((productId, quantity, elm) => {
    if (isProductAdded) return;
    setIsProductAdded(true);
    try {
      setTotalQuantity(prev => prev + Number(quantity));
      dispatch(addToCartAsync({ payload: { productId, quantity, userId, elm, setTotalPrice } }));
    } finally {
      setIsProductAdded(false);
    }
  }, 500);

  // Add to cart handler
  const addToCart = useCallback((productId, quantity, elm, index) => {
    setItemAdd(prev => ({ ...prev, [index]: true }));
    setTimeout(() => {
      setItemAdd(prev => ({ ...prev, [index]: false }));
    }, 1000);
    debouncedAddToCart(productId, quantity, elm);
    toast.success("Product Added Successfully!");
  }, [debouncedAddToCart]);

  // Toggle product like status
  const toggleLike = (index) => {
    setLikedItems(prev => ({ ...prev, [index]: !prev[index] }));
  };

  // Render loading spinner
  if (loading || filtering) {
  return (
    <div className={itemCssModule.loadingContainer}>
      <div className={itemCssModule.loading}>
        <ClipLoader size={40} color="blue" />
        <p className={itemCssModule.loadingName}>Loading...</p>
      </div>
    </div>
  );
}


  // Render empty product state
  if (productState.allProducts.length === 0) {
    return (
      <div className={itemCssModule.noProductsContainer}>
        <p className={itemCssModule.noProductsText}>No products found matching your filter.</p>
      </div>
    );
  }

  return (
    <>
      <ToastContainer />
      {productState.allProducts.map((elm, index) => (
        <div key={elm.id || index} className={itemCssModule.oneItem}>
          <span onClick={() => toggleLike(index)} className={itemCssModule.likeToggle}>
            {likedItems[index] ? "❤️" : "🤍"}
          </span>
          <div className={itemCssModule.itemImage}>
            <img className={itemCssModule.image} src={elm.image} alt={elm.name} />
          </div>
          <div className={itemCssModule.itemInfo}>
            <div className={itemCssModule.itemName}>{elm.name}</div>
            <div className={itemCssModule.itemPrice}>&#8377;&nbsp;{elm.price}</div>
            <button
              onClick={() => {
                if (loggedIn) {
                  addToCart(elm.id, elm.quantity, elm, index);
                } else {
                  navigate("/signIn");
                  toast.error("Please sign up to add products!");
                }
              }}
              className={itemCssModule.addButton}
            >
              {itemAdd[index] ? "Adding" : "Add to Cart"}
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default ItemCard;
