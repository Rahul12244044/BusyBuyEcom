import { useState, useEffect } from "react";
import { useItem } from "./context/itemContext.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NavBar from "./components/nav.js";
import ItemCard from "./pages/itemCard.js";
import PriceRange from "./pages/priceRange.js";
import AddProduct from "./pages/addProduct.js";
import Cart from "./pages/cart.js";
import SignUp from "./pages/signUp.js";
import SignIn from "./pages/signIn.js";
import MyOrders from "./pages/myOrders.js";

const AppRouter = () => {
  const { isInitialized } = useItem();
  const [showFilter, setShowFilter] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!isInitialized) return null;

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <NavBar />

          {/* Toggle Button for Filter on small screens */}
          {/* {isMobile && (
            <div style={{ padding: "10px", textAlign: "center" }}>
              <button onClick={() => setShowFilter(!showFilter)}>
                {showFilter ? "Hide Filters" : "Show Filters"}
              </button>
            </div>
          )} */}

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "20px",
              padding: "20px",
              justifyContent: "center",
            }}
          >
            {/* Filter Sidebar */}
            {(!isMobile || (isMobile && showFilter)) && (
              <div
                style={{
                  flex: "1 1 300px",
                  maxWidth: "300px",
                }}
              >
                <PriceRange />
              </div>
            )}

            {/* Item Cards Section */}
            <div
              style={{
                flex: "3 1 0",
                display: "flex",
                flexWrap: "wrap",
                gap: "20px",
                justifyContent: "center",
              }}
            >
              <ItemCard />
            </div>
          </div>
        </>
      ),
    },
    {
      path: "/addProduct",
      element: (
        <>
          <NavBar />
          <AddProduct />
        </>
      ),
    },
    {
      path: "/cart",
      element: (
        <>
          <NavBar />
          <Cart />
        </>
      ),
    },
    {
      path: "/signUp",
      element: <SignUp />,
    },
    {
      path: "/signIn",
      element: <SignIn />,
    },
    {
      path: "/myOrders",
      element: (
        <>
          <NavBar />
          <MyOrders />
        </>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRouter;
